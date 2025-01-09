import { useState } from "react";
import WelcomeMonitor from "./Lobby";
import Dashboard from "./Dashboard";
import { Visitor } from "@/utils/visitor.utils";
import { io } from "socket.io-client";
import Lobby from "./Lobby";

interface StallAdminPanelProps {
  socket: ReturnType<typeof io> | null;
  visitors: Visitor[];
  selectedStall: string;
}

const StallAdminPanel = ({socket, visitors, selectedStall}: StallAdminPanelProps) => {
  const [currentView, setCurrentView] = useState<"dashboard" | "monitor">("monitor")
  
  return (
    currentView === "dashboard" ? <Dashboard socket={socket} visitors={visitors}/> :
    currentView === "monitor"   ? <Lobby socket={socket} visitors={visitors}/>
    : <p> unexpected value of currentView </p>
  )
}
export default StallAdminPanel