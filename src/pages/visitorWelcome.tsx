import { Box, Typography, Button, Paper } from "@mui/material";

const VisitorWelcome = () => {
  const handleClick = () => {
    alert("Welcome to Joutho!");
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
          Welcome Visitor!
        </Typography>
        <Typography variant="body1" gutterBottom>
          We&apos;re excited to have you here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClick}
        >
          Proceed
        </Button>
      </Paper>
    </Box>
  );
};

export default VisitorWelcome;
