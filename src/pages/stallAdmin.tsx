import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { stallStyles } from "./stall";
import { getStallActivity, listenToStallActivity } from "@/utils/stall.utils";

export default function StallAdmin() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorStatus, setVisitorStatus] = useState("Idle");

  listenToStallActivity(setVisitorStatus)

  useEffect(
    ()=> {
        console.log ('visitor status changed:', visitorStatus)
    },[visitorStatus]
  )

  const handleApproveVisitor = () => {
    setVisitorStatus("Approved");
    alert("Visitor Approved!");
    // Notify Firestore to update the visitor status
  };

  useEffect(() => {
    // Firestore or backend sync for live visitor updates
    const fetchVisitorData = () => {
      setVisitorName("John Doe");
    };
    fetchVisitorData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fafafa",
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
          Admin Panel - Visitor Status
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Visitor Name"
              variant="outlined"
              fullWidth
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Visitor Status: {visitorStatus}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApproveVisitor}
              sx={{ mt: 3,...stallStyles.button }}
            >
              Approve Visitor
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setVisitorStatus("Paused")}
              sx={{ mt: 2}}
            >
              Pause Session
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
