import { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import WelcomeCard from "@/components/Welcome/WelcomeCard";
import EnterPassword from "@/components/Welcome/EnterPassword";
import RequestCharacterCreationModal from "@/components/CharacterCreation/Requested";
import CharacterCreation from "@/components/CharacterCreation/Ongoing";
import { io, Socket } from "socket.io-client";
import { socketUrl } from "../../../socketConfig"
import { SelectionState, Visitor, VisitorState } from "@/utils";
import { EventConstant } from "@/const/event.const";

export interface CharacterCreationState {
  animal:  SelectionState
  element: SelectionState
  item:    SelectionState
  power:   SelectionState
}

export enum EventName {
  STALL_ACTIVITY_CHANGED = "stallActivityChanged",
}

export default function Welcome() {

  const [socket, setSocket] = useState<Socket | null>(null)
  const [visitor, setVisitor] = useState<Visitor>({
    id: Math.random().toString(),
    name: "",
    visitorState: VisitorState.ENTER_NAME,
    avatarState: {
      animal:  { value: null, selectionState: SelectionState.IDLE },
      element: { value: null, selectionState: SelectionState.IDLE },
      item:    { value: null, selectionState: SelectionState.IDLE },
      power:   { value: null, selectionState: SelectionState.IDLE },
    }
  });

  const backgroundColor = useMemo(() => {
    switch (visitor.visitorState) {
      case VisitorState.ENTER_NAME: return commonStyles.colors.darkBrown;
      
      default: return commonStyles.colors.lightBrown;
    }
  }, [visitor.visitorState])

  useEffect (() => {
    const newSocket = io (socketUrl)
    setSocket (newSocket)

    return () => {
      socket?.disconnect()
    }
  },[])

  const renderContent = useMemo (
    () => 
      visitor.visitorState === VisitorState.ENTER_NAME ?
        <WelcomeCard
          visitor={visitor}
          setVisitor={setVisitor}
        /> :
      visitor.visitorState ===  VisitorState.ENTER_PASSWORD ?
        <EnterPassword
          visitor={visitor}
          setVisitor={setVisitor}
        /> :
      visitor.visitorState === VisitorState.CHARACTER_CREATION_ONGOING ? 
        <CharacterCreation
          socket={socket} 
          visitor={visitor}
          setVisitor={setVisitor}
        /> :
      visitor.visitorState === VisitorState.CHARACTER_CREATION_SUCCESS ? 
        <Typography>{`Welcome to the Joutho network, ${visitor.name}!`}</Typography> 
        
      :null, 
    [visitor]
  )

  useEffect (
    () => {
      if (visitor.visitorState === VisitorState.CHARACTER_CREATION_ONGOING){
        socket?.emit (
          EventConstant.Stall.Visitor.CAME.NOTIFY,
          visitor
        )
      }
    },
    [visitor.visitorState]
  )

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundColor,
      }}
    >
      {renderContent}

      <RequestCharacterCreationModal
        open={visitor.visitorState === VisitorState.CHARACTER_CREATION_PROMPTED}
        onClose={() => {
          console.log ('closed modal')
        }}
        visitor={visitor}
        setVisitor={setVisitor}
      />
    </Box>
  );
}