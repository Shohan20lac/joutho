import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { listenToStallActivity } from "@/utils/stall.utils";

export default function StallMonitor() {
  const [monitorContent, setMonitorContent] = useState("");
  const [visitorStatus, setVisitorStatus] = useState ("idle")

  listenToStallActivity(setVisitorStatus)

  useEffect(() => {
    // This would typically be synced with Firestore, watching for data updates
    // Example: Firestore onSnapshot logic to sync content from stallTablet
    const fetchData = () => {
      setMonitorContent("Character creation in progress...");
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Joutho Monitor
        </Typography>
        <Typography variant="subtitle1">{monitorContent}</Typography>
      </Paper>
    </Box>
  );
}
