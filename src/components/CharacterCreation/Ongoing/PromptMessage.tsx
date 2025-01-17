import { AvatarState, SelectionState } from "@/utils";
import { Typography } from "@mui/material";

export interface PromptMessageProps {
  avatarState: AvatarState;
}

const PromptMessage = ({ avatarState }: PromptMessageProps) => {
  const { animal, element, item, power } = avatarState;

  return (
    <Typography sx={{ fontSize:"1.2rem", textAlign: "center", color: "black"}}>
      {
        animal.selectionState === SelectionState.IDLE
        ? "Are you a hawk, owl, or dolphin?"
        : animal.selectionState === SelectionState.REQUESTED
        ? `Are you a ${animal.value}?`
        : element.selectionState === SelectionState.IDLE
        ? "Are you fire, water, air, or earth?"
        : element.selectionState === SelectionState.REQUESTED
        ? `Are you ${element.value}?`
        : item.selectionState === SelectionState.IDLE
        ? "Pick a magic item to save the world."
        : item.selectionState === SelectionState.REQUESTED
        ? `Pick a ${item.value} to save the world.`
        : power.selectionState === SelectionState.IDLE
        ? "Pick a magic power for your item."
        : power.selectionState === SelectionState.REQUESTED
        ? `Pick ${power.value} for your item.`
        : "Avatar Creation Complete"}
    </Typography>
  );
};

export default PromptMessage;
