import { useEffect, useState } from "react";
import StallSelector from "../../components/StallSelector/";
import WelcomeMonitor from "../../components/WelcomeMonitor/";
import { io } from "socket.io-client";
import { Box, Button } from "@mui/material";
import { socketUrl } from "../../../socketConfig";
import { Visitor } from "@/utils/visitor.utils";
import StallAdmin from "@/components/StallAdmin";
import TopNavBar from "@/components/TopNavBar";

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<"selector" | "admin" | "monitor">("selector");
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

  const renderContent = () =>
    selectedStall 
    ?
        currentView === "admin"   ? <StallAdmin socket={socket} visitors={visitors} />: 
        currentView === "monitor" ? <WelcomeMonitor socket={socket} visitors={visitors} />
        : <p> Unexpected currentView value </p>
    : 
        <StallSelector onSelectStall={setSelectedStall} />

    

  return (
    <Box>
        {
            currentView === "admin" || currentView === "monitor" 
            ? 
                <TopNavBar
                    currentView ={currentView}
                    setCurrentView={setCurrentView}
                />
            : 
                null
        }
        {renderContent()}
    </Box>
  );
}
