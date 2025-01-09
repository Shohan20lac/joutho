import { useEffect, useState } from "react";
import StallSelector from "../../components/StallSelector/";
import { io } from "socket.io-client";
import { Box, Button } from "@mui/material";
import { socketUrl } from "../../../socketConfig";
import { Visitor } from "@/utils/visitor.utils";
import TopNavBar from "@/components/TopNavBar";
import StallAdminPanel from "../../components/StallAdminPanel/";

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<"dashboard" | "lobby" | null> (null)
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [visitors, setVisitors] = useState<Visitor[]>([])

  useEffect(() => {
    const newSocket = io (socketUrl)
    setSocket(newSocket)

    // Fetch initial visitor list and traits
    newSocket.on("connect", () => {
      newSocket.emit("getVisitors")
    })

    newSocket.on ("updateVisitorList", (visitorList: Visitor[]) => {
      setVisitors(visitorList)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [])    

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
        ? <StallAdminPanel socket={socket} visitors={visitors} selectedStall={selectedStall} />
        : <StallSelector   onSelectStall={setSelectedStall} />
      }
    </Box>
  );
}
