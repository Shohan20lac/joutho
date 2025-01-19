import { IdentityConstant } from "@/const/identity.const";
import { Stall } from "@/types";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface StallSelectorProps {
  onSelectStall: Dispatch<SetStateAction<Stall | null>>
}

export default function StallSelector({ onSelectStall }: StallSelectorProps) {
  const [stalls, setStalls] = useState<Stall[]>([]);
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
          Select Active Stall
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          {
            stalls.map ((stall: Stall) => (
              <Button
                key={stall.id}
                variant="contained"
                color="primary"
                onClick={() => onSelectStall (stall)}
                sx={{ height: 60, my: 1 }}
              >
                {stall.name}
              </Button>
            ))
          }
        </Box>
      </Paper>
    </Box>
  );
}
