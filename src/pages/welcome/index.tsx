import { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { Animal, Element, Item, Power } from "@/const/avatar.const";
import WelcomeCard from "@/components/Welcome/WelcomeCard";
import EnterPassword from "@/components/Welcome/EnterPassword";
import RequestCharacterCreationModal from "@/components/Welcome/RequestCharacterCreationModal";
import CharacterCreation from "@/components/CharacterCreation";
import { io } from "socket.io-client";

import { socketUrl } from "../../../socketConfig"
import { SelectionState } from "@/utils/selection.utils";
import { VisitorState } from "@/utils/visitor.utils";

export interface CharacterCreationState {
  animal:  SelectionState
  element: SelectionState
  item:    SelectionState
  power:   SelectionState
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

  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const [visitorState, setVisitorState] = useState<VisitorState>(VisitorState.ENTER_NAME);

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
  }, [visitorState])

  // useEffect(() => {
  //   const visitorStateListener = createSnapshotListener ({
  //     eventType: EventType.STALL_EVENT,
  //     eventName: EventName.STALL_ACTIVITY_CHANGED,
  //     onTrigger: (newVisitorState: VisitorState) => setVisitorState(newVisitorState),
  //   });

  //   return () => {
  //     if (visitorStateListener) {
  //       visitorStateListener();
  //     }
  //   };
  // }, []);

  useEffect (() => {
    const newSocket = io (socketUrl)
    setSocket (newSocket)

  },[])

  const renderContent = useMemo (
    () => 
      visitorState === VisitorState.ENTER_NAME ?
        <WelcomeCard
          avatarState={avatarState}
          setAvatarState={setAvatarState}
          setVisitorState={setVisitorState}
        /> :
      visitorState ===  VisitorState.ENTER_PASSWORD ?
        <EnterPassword
          avatarState={avatarState}
          setAvatarState={setAvatarState}
          setVisitorState={setVisitorState}
        /> :
      visitorState === VisitorState.CHARACTER_CREATION_ONGOING ? 
        <CharacterCreation
          avatarState={avatarState}
          setAvatarState={setAvatarState}
        /> :
      visitorState === VisitorState.CHARACTER_CREATION_SUCCESS ? 
        <Typography>{`Welcome to the Joutho network, ${avatarState.name}!`}</Typography> :
      null, 
    [visitorState, avatarState]
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
        open={visitorState === VisitorState.CHARACTER_CREATION_PROMPTED}
        onClose={() => setVisitorState(VisitorState.ENTER_NAME)}
        visitorName={avatarState.name}
        setVisitorState={setVisitorState}
      />
    </Box>
  );
}