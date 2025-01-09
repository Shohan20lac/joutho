import { IdentityConstant } from "@/const/identity.const";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface StallSelectorProps {
  onSelectStall: Dispatch<SetStateAction<string | null>>
}

export default function StallSelector({ onSelectStall }: StallSelectorProps) {
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelectStall (IdentityConstant.JOUTHO_BIRTHPLACE)}
            sx={{ height: 60, my: 1 }}
          >
            Joutho's Birthplace
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
