import { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { stallStyles } from "./stall";

export default function StallTablet() {
  const [visitorName, setVisitorName] = useState("");

  const handleCharacterCreation = () => {
    alert(`Character Creation for ${visitorName}!`);
    // Trigger Firestore character creation process, notify admin
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Joutho!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Tap below to learn more
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCharacterCreation}
          sx={{ mt: 3, ...stallStyles.button }}
        >
          What am I?
        </Button>
      </Paper>
    </Box>
  );
}
