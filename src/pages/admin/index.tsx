// src/pages/admin/index.tsx
import { useState } from "react";
import useSocket from "@/hooks/useSocket";
import { EventConstant } from "@/const/event.const";
import { Visitor } from "@/utils";
import { socketUrl } from "../../../socketConfig";
import TopNavBar from "@/components/TopNavBar";
import StallAdminPanel from "@/components/StallAdminPanel";
import StallSelector from "@/components/StallSelector";
import { AdminPageScreen, Stall } from "@/types";

export default function AdminPage() {
  const [currentView, setCurrentView] = useState <AdminPageScreen> (AdminPageScreen.DASHBOARD);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const { socket, stallActivity, setStallActivity } = useSocket (socketUrl, selectedStall )

  const tryApprovePendingTrait = (visitor: Visitor) => {
    const pendingTrait = visitor.avatarState.pendingTrait
    if (!pendingTrait)
      return

    const payload = { visitorId: visitor.id, approvedTrait: pendingTrait }
    console.log ('@AdminPage: about to emit APPROVED_VISITOR_TRAIT.NOTIFY with payload:', payload)
    socket?.emit(EventConstant.Stall.Admin.APPROVED_VISITOR_TRAIT.NOTIFY, payload);
  }

  return (
    selectedStall 
    ? 
      <>
        <TopNavBar selectedTab={currentView} onSelectTab={setCurrentView} />
        <StallAdminPanel
          socket={socket}
          currentView={currentView}
          stallActivity={stallActivity}
          setStallActivity={setStallActivity}
          handleVisitorBadgeClick={tryApprovePendingTrait}
        />
      </>
    : 
      <StallSelector onSelectStall={setSelectedStall} />
  );
}