import { Box } from "@mui/material";
import { io } from "socket.io-client";
import VisitorBadge from "../VisitorBadge";
import { commonStyles } from "@/sharedStyles";
import { Dispatch, SetStateAction } from "react";
import { advanceAvatarState, AvatarState, SelectionState, StallActivity, Visitor } from "@/utils";
import { EventConstant } from "@/const/event.const";

interface LobbyProps {
  socket: ReturnType<typeof io> | null;
  stallActivity: StallActivity;
  setStallActivity: Dispatch<SetStateAction<StallActivity>>;
  handleVisitorBadgeClick: (visitor: Visitor) => void;
}


export default function Lobby({ socket, stallActivity, handleVisitorBadgeClick }: LobbyProps) {
  console.log("about to render lobby", stallActivity);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap", // Wrap badges to the next line if they don't fit
        justifyContent: "center", // Center the badges horizontally
        position: "fixed", // Full screen without scroll
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: commonStyles.colors.veryLightBrown,
        overflow: "hidden",
        padding: 2,
        gap: 2, // Add space between badges
      }}
    >
      {Object.values(stallActivity.visitors).map((visitor) => (
        <VisitorBadge 
          key     = {visitor.id} 
          visitor = {visitor}
          onClick = {
            () => {
              handleVisitorBadgeClick (visitor)
              // setStallActivity (
              //   (prevState) => ({
              //     ...prevState,
              //     visitors: {
              //       ...prevState.visitors,
              //       [visitor.id]: {
              //         ...visitor,
              //         avatarState: newAvatarState
              //       }
              //     }
              //   })
              // )
            }
          }
        />
      ))}
    </Box>
  );
}
