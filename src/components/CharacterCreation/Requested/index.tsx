import { Paper, Typography, Button, Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { commonStyles } from "@/sharedStyles";
import { Visitor, VisitorState, UserStatus } from "@/utils";
import Bubble from "./Bubble";
import { PromptStart } from "./PromptStart";
import { WaitingForAdmin } from "./WaitingForAdmin";
import AdminReady from "./AdminReady";

export enum RequestCharacterCreationState {
  PROMPT_START = "promptStart",
  WAITING_FOR_ADMIN = "waitingForAdmin",
  ADMIN_READY = "adminReady",
}

interface RequestCharacterCreationModalProps {
  open: boolean;
  onClose: () => void;
  visitor: Visitor;
  setVisitor: Dispatch<SetStateAction<Visitor>>;
}

interface AdminState {
  name: string;
}

const RequestCharacterCreationModal = ({open, onClose, visitor, setVisitor}: RequestCharacterCreationModalProps) => {
  const [requestCharacterCreationState, setRequestCharacterCreationState] = useState<RequestCharacterCreationState> (RequestCharacterCreationState.PROMPT_START)
  const [adminState] = useState<AdminState> ({ name: "shohan" })

  const handleYes = () => setRequestCharacterCreationState (RequestCharacterCreationState.WAITING_FOR_ADMIN)
  const handleNo  = () => setVisitor ({...visitor, visitorState: VisitorState.ENTER_PASSWORD})

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
        {
            requestCharacterCreationState === RequestCharacterCreationState.PROMPT_START ?
                <PromptStart onYes={handleYes} onNo={handleNo} /> :
            
            requestCharacterCreationState === RequestCharacterCreationState.WAITING_FOR_ADMIN ?
                <WaitingForAdmin /> :
            
            requestCharacterCreationState === RequestCharacterCreationState.ADMIN_READY ?
                <AdminReady adminName={adminState.name} /> :
            
            null
        }
      </Paper>
    </Modal>
  )
}

export default RequestCharacterCreationModal
