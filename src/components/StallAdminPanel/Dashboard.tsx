import { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Fab } from "@mui/material";
import { io } from "socket.io-client";
import { generateNewVisitor, StallActivity } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { EventConstant } from "@/const/event.const";


interface StallAdminProps {
  socket: ReturnType<typeof io> | null;
  stallActivity: StallActivity;
}

export default function Dashboard ({ socket, stallActivity }: StallAdminProps) {
  const handleAddVisitor = () => {
    if (socket) {
      socket.emit (
        EventConstant.Stall.Visitor.CAME.NOTIFY,
        generateNewVisitor()
      )
    } 
    else
      console.error("Socket not initialized!")
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        backgroundColor: "#f9f9f9",
        position: "relative", // For positioning the floating button
        height: "100vh", // Ensure the box takes the full height for button placement
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ paddingBottom: 2 }}
      >
        Stall Admin
      </Typography>

      {/* Visitor Cards */}
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
        }}
      >
        {Object.values(stallActivity.visitors).map((visitor) => (
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={4}
            key={visitor.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: "500px", // Cap card width for large screens
                padding: 3,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ marginBottom: 1, textAlign: "center" }}
              >
                {visitor.name || `Visitor #${visitor.id}`}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", color: "gray" }}
              >
                {visitor.visitorState}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Floating Button */}
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={handleAddVisitor}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
