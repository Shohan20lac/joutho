import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { io } from "socket.io-client";
import Lobby from "./Lobby";
import { StallActivity, Visitor } from "@/utils";


interface StallAdminPanelProps {
  socket: ReturnType<typeof io> | null;
  currentView: string | null;
  
  stallActivity: StallActivity;
  setStallActivity: Dispatch<SetStateAction<StallActivity>>;
  handleVisitorBadgeClick: (visitor: Visitor) => void;
}

const StallAdminPanel = ({socket, stallActivity, currentView, setStallActivity, handleVisitorBadgeClick}: StallAdminPanelProps) => {
  return (
    currentView === "dashboard" ? 
      <Dashboard socket={socket} stallActivity={stallActivity}/> :
    
    currentView === "lobby" ? 
      <Lobby
        socket={socket}
        stallActivity={stallActivity}
        setStallActivity={setStallActivity}
        handleVisitorBadgeClick={handleVisitorBadgeClick}
      />
    
    : <p> unexpected value of currentView </p>
  )
}
export default StallAdminPanel