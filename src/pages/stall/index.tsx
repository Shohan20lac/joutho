import { useEffect, useState } from "react";
import { Button, Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { stallStyles } from "@/sharedStyles";

type DeviceName = "tablet" | "monitor" | "admin";

export default function StallSelector() {
  const router = useRouter()

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
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Select Stall Device
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/stall/tablet")}
            sx={{ height: 60, my: 1, ...stallStyles.button}}
          >
            Stall Tablet
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/stall/monitor")}
            sx={{ height: 60, my: 1, ...stallStyles.button }}
          >
            Stall Monitor
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => router.push("/stall/admin")}
            sx={{ height: 60, my: 1, ...stallStyles.button }}
          >
            Stall Admin
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
