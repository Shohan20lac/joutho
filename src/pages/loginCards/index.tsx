import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";

const LoginCards = () => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username === "admin") {
      alert("Admin logged in!");
    } else {
      alert("Login unsuccessful.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginCards;
