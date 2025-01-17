import { useEffect, useState } from "react";
import StallSelector from "../../components/StallSelector/";
import { io } from "socket.io-client";
import { Box, Button } from "@mui/material";
import { socketUrl } from "../../../socketConfig";
import TopNavBar from "@/components/TopNavBar";
import StallAdminPanel from "../../components/StallAdminPanel/";
import { EventConstant } from "@/const/event.const";
import { IdentityConstant } from "@/const/identity.const";
import { AvatarState, getNearestApprovableTrait, SelectionState, StallActivity } from "@/utils";
import fs from 'fs';
import path from 'path';
import { AudibleEvent, generateNewVisitor, playAlertSound, Visitor, VisitorsMap } from "@/utils";


export default function AdminPage() {
  const [currentView, setCurrentView] = useState<"dashboard" | "lobby" | null> (null)
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const handleVisitorBadgeClick = (visitor: Visitor) => {
    const nearestApprovableTrait = getNearestApprovableTrait(visitor.avatarState)
    console.log ('@handleVisitorBadgeClick: got nearestApprovableTrait:', nearestApprovableTrait)
  
    if (!nearestApprovableTrait) {
      console.error ('@handleVisitorBadgeClick: no nearestApprovableTrait found')
      return
    }
  
    const adminApprovedVisitorTraitNotifyDto = {
      visitorId: visitor.id,
      approvedTrait: nearestApprovableTrait
    }
    console.log ('about to emit approve trait notify with this dto:', adminApprovedVisitorTraitNotifyDto)
    socket?.emit (
      EventConstant.Stall.Admin.APPROVED_VISITOR_TRAIT.NOTIFY,
      adminApprovedVisitorTraitNotifyDto
    )
  }

  const [stallActivity, setStallActivity] = useState <StallActivity> ({admins: {}, visitors: {} as VisitorsMap})

  useEffect(() => {
    const newSocket = io (socketUrl)
    setSocket (newSocket)

    newSocket.on ("connect", () => {
      newSocket.emit("getVisitors")
    })

    newSocket.on(
      EventConstant.Stall.Sync.RESPONSE,
      (serverStallActivity: StallActivity) => {
        console.log('got stall sync response from server:', serverStallActivity);
        setStallActivity((prevState) => ({
          ...prevState,
          admins: {
            ...prevState.admins,
            ...serverStallActivity.admins,
          },
          visitors: {
            ...prevState.visitors,
            ...serverStallActivity.visitors,
          },
        }));
      }
    );
    newSocket.emit (EventConstant.Stall.Sync.REQUEST)

    newSocket.on (
      EventConstant.Stall.Visitor.CAME.ACKNOWLEDGE,
      (visitor: Visitor) => {
        console.log ('got visitor ack:', visitor)
        playAlertSound (AudibleEvent.START)
        setStallActivity ((prevState) => ({
          ...prevState,
          visitors: {
            ...prevState.visitors,
            [visitor.id]: visitor,
          }
        }))
      } 
    )

    newSocket.on (
      EventConstant.Stall.Admin.MANNED_STALL.ACKNOWLEDGE,
      (newAdmin: any) => {
        console.log ('admin manned stall ack:', newAdmin)
        setStallActivity ((prevState) => ({
          ...prevState,
          admins: {
            ...prevState.admins,
            [newAdmin.id]: newAdmin,
          },
        }))
      }
    )

    newSocket.on (
      EventConstant.Stall.Visitor.SELECTED_TRAIT.ACKNOWLEDGE,
      (data: any) => {
        console.log('visitor selected trait ack:', data);
        const { visitorId, selectedTrait, selectedTraitValue } = data;
    
        setStallActivity((prevState) => {
          const visitor = prevState.visitors[visitorId];
          if (!visitor) {
            console.error('visitor not found:', visitorId);
            return prevState; // Return previous state if visitor not found
          }
    
          const updatedAvatarState = {
            ...visitor.avatarState,
            [selectedTrait]: {
              value: selectedTraitValue,
              selectionState: SelectionState.REQUESTED,
            },
          };
    
          return {
            ...prevState,
            visitors: {
              ...prevState.visitors,
              [visitorId]: {
                ...visitor,
                avatarState: updatedAvatarState,
              },
            },
          };
        });
      }
    )

    newSocket.on (
      EventConstant.Stall.Admin.APPROVED_VISITOR_TRAIT.ACKNOWLEDGE,
      (data: { visitorId: string; approvedTrait: keyof AvatarState }) => {
        console.log("admin approved visitor trait ack:", data);
    
        const { visitorId, approvedTrait } = data;
    
        setStallActivity((prevState) => {
          const visitor = prevState.visitors[visitorId];
    
          if (!visitor) {
            console.error("visitor not found:", visitorId);
            return prevState; // Return previous state if visitor not found
          }
    
          if (!visitor.avatarState[approvedTrait]) {
            console.error("approved trait not found in avatarState:", approvedTrait);
            return prevState; // Return previous state if approvedTrait is invalid
          }
    
          const updatedAvatarState = {
            ...visitor.avatarState,
            [approvedTrait]: {
              ...visitor.avatarState[approvedTrait],
              selectionState: SelectionState.APPROVED,
            },
          };
    
          return {
            ...prevState,
            visitors: {
              ...prevState.visitors,
              [visitorId]: {
                ...visitor,
                avatarState: updatedAvatarState,
              },
            },
          };
        });
      }
    );
    
    

    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect (
    () => {
      if (selectedStall===null) return
      if (socket==null) return
      
      socket.emit (
        EventConstant.Stall.Admin.MANNED_STALL.NOTIFY, 
        {
          id: "admin-" + Math.round(Math.random() * 1000),
          name: "Admin " + Math.round(Math.random() * 1000),
        }
      )
    },
    [selectedStall]
  )

  return (
    <Box>
      {
        selectedStall &&
          <TopNavBar
            selectedTab={currentView}
            onSelectTab={setCurrentView}
          />
      }
      {
        selectedStall 
        ? 
          <StallAdminPanel 
            socket={socket} 
            currentView={currentView}
            stallActivity={stallActivity} 
            setStallActivity={setStallActivity}
            handleVisitorBadgeClick={handleVisitorBadgeClick}
          />
        : 
          <StallSelector 
            onSelectStall={setSelectedStall} 
          />
      }
    </Box>
  );
}
