// src/hooks/useSocket.ts
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { EventConstant } from "@/const/event.const";
import { StallActivity } from "@/utils";
import { Stall } from "@/types";

const useSocket = (socketUrl: string, selectedStall: Stall | null) => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [stallActivity, setStallActivity] = useState<StallActivity>({ admins: {}, visitors: {} });

  useEffect(() => {
    if (!socketUrl) return;
  
    const newSocket = io(socketUrl);
    setSocket(newSocket);
  
    newSocket.on("connect", () => newSocket.emit(EventConstant.Stall.Sync.REQUEST));
    newSocket.on(EventConstant.Stall.Sync.RESPONSE, (data) => setStallActivity((prev) => ({ ...prev, ...data })));
    newSocket.on(EventConstant.Stall.Visitor.CAME.ACKNOWLEDGE, (visitor) => {
      setStallActivity((prev) => ({
        ...prev,
        visitors: {
          ...prev.visitors,
          [visitor.id]: visitor,
        },
      }));
    });
  
    newSocket.on(EventConstant.Stall.Admin.MANNED_STALL.ACKNOWLEDGE, (admin) => {
      setStallActivity((prev) => ({
        ...prev,
        admins: {
          ...prev.admins,
          [admin.id]: admin,
        },
      }));
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  useEffect(() => {
    if (!selectedStall || !socket) return;

    socket.emit(EventConstant.Stall.Admin.MANNED_STALL.NOTIFY, {
      id: "admin-" + Math.random(),
      name: "Admin " + Math.random(),
    });
  }, [selectedStall, socket]);

  return { socket, stallActivity, setStallActivity };
};

export default useSocket;