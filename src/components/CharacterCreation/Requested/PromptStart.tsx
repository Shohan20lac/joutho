import { Box, Button } from "@mui/material";

export const PromptStart = ({ onYes, onNo }: { onYes: () => void; onNo: () => void }) => {
  return (
    <Box>
      <Button onClick={onYes}>Yes</Button>
      <Button onClick={onNo}>No</Button>
    </Box>
  )
}