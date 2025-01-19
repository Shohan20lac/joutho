import { TalkingPillowState } from "@/types";
import { Avatar, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import TalkingPillow from "./TalkingPillow";

export const Communicator = ({talkingPillowState, setTalkingPillowState}: {
  talkingPillowState: TalkingPillowState | null
  setTalkingPillowState: Dispatch<SetStateAction<TalkingPillowState | null>>
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <Avatar src={undefined} sx={{ marginRight: 1 }} />
        <Avatar src={adminAvatarImage} sx={{ marginRight: 1 }} />
      </Box>

      {talkingPillowState && (
        <TalkingPillow
          talkingPillowState={talkingPillowState}
          onChangeState={setTalkingPillowState}
        />
      )}
    </Box>

  )
}