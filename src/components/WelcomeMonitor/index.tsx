import { Box, Typography } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { Visitor } from "@/utils/visitor.utils";
import { io } from "socket.io-client";

interface WelcomeMonitorProps {
  socket: ReturnType<typeof io> | null;
  visitors: Visitor[]; // List of visitors
}

// Predefined coordinates for Visitor Badges
const BADGE_COORDINATES: { [index: number]: { x: number; y: number } } = {
  0: { x: 50, y: 50 },
  1: { x: 300, y: 50 },
  2: { x: 550, y: 50 },
  3: { x: 50, y: 300 },
  4: { x: 300, y: 300 },
  // Add more coordinates as needed
};

export default function WelcomeMonitor({ socket, visitors }: WelcomeMonitorProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: commonStyles.colors.lightBrown,
        overflow: "hidden",
      }}
    >
      {visitors.map((visitor, index) => {
        const position = BADGE_COORDINATES[index] || { x: 800, y: 800 }; // Default position if coordinates run out

        return (
          <Box
            key={visitor.id}
            sx={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 4,
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              minWidth: 200,
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            {/* Visitor Badge */}
            <Typography variant="h6" fontWeight="bold" sx={{ color: commonStyles.colors.darkBrown }}>
              {visitor.name || `Visitor #${visitor.id}`}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
              State: {visitor.visitorState}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
              Animal: {visitor.avatarState.animal}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Element: {visitor.avatarState.element}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Item: {visitor.avatarState.item}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Power: {visitor.avatarState.power}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
