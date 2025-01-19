import { Paper, Typography, Button, Box, Modal, Avatar } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { commonStyles } from "@/sharedStyles";
import { Visitor, VisitorState } from "@/utils";
import { RequestCharacterCreationConstant } from "@/const/request.character.creation.const";
import { RequestCharacterCreationState, TalkingPillowHolderState, TalkingPillowState } from "@/types";
import TalkingPillow from "./TalkingPillow";
import { PromptStart } from "./PromptStart";
import { Communicator } from "./Communicator";

interface RequestCharacterCreationModalProps {
  open: boolean;
  onClose: () => void;
  visitor: Visitor;
  setVisitor: Dispatch<SetStateAction<Visitor>>;
}

const { PROMPT_START, WAITING_FOR_ADMIN, ADMIN_READY } = RequestCharacterCreationState;
const { WILL_TALK, IS_LISTENING } = TalkingPillowHolderState;





const RequestCharacterCreationModal = ({open, onClose, visitor, setVisitor, }: RequestCharacterCreationModalProps) => {
  const [requestCharacterCreationState, setRequestCharacterCreationState] = useState<RequestCharacterCreationState>(RequestCharacterCreationState.PROMPT_START)
  const [talkingPillowState, setTalkingPillowState] = useState<TalkingPillowState | null>(null)

  const handleYes = () => {
    setRequestCharacterCreationState(RequestCharacterCreationState.WAITING_FOR_ADMIN);
    setTalkingPillowState({ admin: WILL_TALK, visitor: IS_LISTENING });
  }

  const handleNo = () => setVisitor ({ ...visitor, visitorState: VisitorState.ENTER_PASSWORD });

  const header    = RequestCharacterCreationConstant.Modal[requestCharacterCreationState].Header;
  const subHeader = RequestCharacterCreationConstant.Modal[requestCharacterCreationState].SubHeader("admin123");
  const body      = RequestCharacterCreationConstant.Modal[requestCharacterCreationState].Body;
  const subtitle  =
    requestCharacterCreationState === ADMIN_READY
    ? 
      RequestCharacterCreationConstant
      .Modal[requestCharacterCreationState]
      .Subtitle[`admin: ${talkingPillowState?.admin} visitor: ${talkingPillowState?.visitor}`]
        ("admin123")
    : 
      RequestCharacterCreationConstant.Modal[requestCharacterCreationState].Subtitle;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 500,
          textAlign: "center",
          backgroundColor: commonStyles.colors.parchment,
          margin: "10px",
        }}
      >
        <Typography>{header}</Typography>
        <Typography>{subHeader}</Typography>
        <Typography>{body}</Typography>

        {
          requestCharacterCreationState === PROMPT_START
          ? <PromptStart onYes={handleYes} onNo={handleNo} />
          : <Communicator talkingPillowState={talkingPillowState} setTalkingPillowState={setTalkingPillowState}/>
        }

        {subtitle && <Typography>{subtitle}</Typography>}
      </Paper>
    </Modal>
  );
};

export default RequestCharacterCreationModal;
