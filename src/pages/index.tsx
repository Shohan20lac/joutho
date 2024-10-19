import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Paper, TextField, Typography } from "@mui/material";
import io from 'socket.io-client';

export default function Login() {
  const [visitorName, setVisitorName] = useState("")

  useEffect(()=> {
    console.log ('visitor Name changed:', visitorName)
  },[visitorName])

  const handleLogin = () => {
    if (visitorName === "00119922") {
      window.location.href = "/stall"
    } else {
      alert("Incorrect visitor name!")
    }
  }

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
          Who are you?
        </Typography>
        <TextField
          label="Enter Visitor Name"
          variant="outlined"
          fullWidth
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mb: 2 }}
        >
          Proceed
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => alert("Sign Up coming soon!")}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  );
}
