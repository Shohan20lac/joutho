import { Box, Typography } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { Visitor } from "@/utils/visitor.utils";
import { io } from "socket.io-client";
import { BADGE_COORDINATES } from "@/const/coordinate.const";
import VisitorBadge from "../VisitorBadge";

interface WelcomeMonitorProps {
  socket: ReturnType<typeof io> | null;
  visitors: Visitor[]; // List of visitors
}

export default function Lobby ({ socket, visitors }: WelcomeMonitorProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: 'white',
        overflow: "hidden",
      }}
    >
      {
        visitors.map ((visitor, index) => 
          <VisitorBadge
            key={visitor.id}
            visitor={visitor}
            position={BADGE_COORDINATES[index] || { x: 0, y: 0 }}
          />
        )
      }
    </Box>
  );
}