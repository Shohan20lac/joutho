import { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { Animal, Element, Item, Power } from "@/const/avatar.const";
import WelcomeCard from "@/components/Welcome/WelcomeCard";
import EnterPassword from "@/components/Welcome/EnterPassword";
import RequestCharacterCreationModal from "@/components/Welcome/RequestCharacterCreationModal";
import CharacterCreation from "@/components/CharacterCreation";
import { createSnapshotListener } from "@/utils/event.utils";
import { EventType } from "@/const/event.const";

export enum VisitorState {
  ENTER_NAME = "ENTER_NAME",
  ENTER_PASSWORD = "ENTER_PASSWORD",
  CHARACTER_CREATION_PROMPTED = "CHARACTER_CREATION_PROMPTED",
  CHARACTER_CREATION_ONGOING = "CHARACTER_CREATION_ONGOING",
  CHARACTER_CREATION_SUCCESS = "CHARACTER_CREATION_SUCCESS",
}

export interface AvatarState {
  name: string;
  animal: Animal | "";
  element: Element | "";
  item: Item | "";
  power: Power | "";
}

export enum EventName {
  STALL_ACTIVITY_CHANGED = "stallActivityChanged",
}

export default function Welcome() {
  const [visitorState, setVisitorState] = useState<VisitorState>(
    VisitorState.ENTER_NAME
  );

  const [avatarState, setAvatarState] = useState<AvatarState>({
    name: "",
    animal: "",
    element: "",
    item: "",
    power: "",
  });

  // Memoize background color to prevent unnecessary recalculations
  const backgroundColor = useMemo(() => {
    switch (visitorState) {
      case VisitorState.ENTER_NAME: return commonStyles.colors.darkBrown;
      
      default: return commonStyles.colors.lightBrown;
    }
  }, [visitorState]);

  useEffect(() => {
    const visitorStateListener = createSnapshotListener({
      eventType: EventType.STALL_EVENT,
      eventName: EventName.STALL_ACTIVITY_CHANGED,
      onTrigger: (newVisitorState: VisitorState) => setVisitorState(newVisitorState),
    });

    return () => {
      if (visitorStateListener) {
        visitorStateListener();
      }
    };
  }, []);

  // Render the main content based on visitor state
  const renderContent = useMemo(() => {
    switch (visitorState) {
      case VisitorState.ENTER_NAME:
        return (
          <WelcomeCard
            avatarState={avatarState}
            setAvatarState={setAvatarState}
            setVisitorState={setVisitorState}
          />
        );
      case VisitorState.ENTER_PASSWORD:
        return (
          <EnterPassword
            avatarState={avatarState}
            setAvatarState={setAvatarState}
            visitorState={visitorState}
            setVisitorState={setVisitorState}
          />
        );
      case VisitorState.CHARACTER_CREATION_ONGOING:
        return (
          <CharacterCreation
            avatarState={avatarState}
            setAvatarState={setAvatarState}
          />
        );
      case VisitorState.CHARACTER_CREATION_SUCCESS:
        return (
          <Typography>{`Welcome to the Joutho network, ${avatarState.name}!`}</Typography>
        );
      default:
        return null;
    }
  }, [visitorState, avatarState]);

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

      {/* Modal is always rendered but conditionally visible */}
      <RequestCharacterCreationModal
        open={visitorState === VisitorState.CHARACTER_CREATION_PROMPTED}
        onClose={() => setVisitorState(VisitorState.ENTER_NAME)}
        visitorName={avatarState.name}
        setVisitorState={setVisitorState}
      />
    </Box>
  );
}