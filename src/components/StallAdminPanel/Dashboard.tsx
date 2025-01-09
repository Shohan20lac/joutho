import { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { io } from "socket.io-client";
import { socketUrl } from "../../../socketConfig";
import { Visitor } from "@/utils/visitor.utils";

interface StallAdminProps {
  socket: ReturnType<typeof io> | null;
  visitors: Visitor[]
}

export default function Dashboard ({ socket, visitors }: StallAdminProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        backgroundColor: "#f9f9f9",
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
        {visitors.map((visitor) => (
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
    </Box>
  );
}