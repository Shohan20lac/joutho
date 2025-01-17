import { Paper, Typography, Button, Box, Switch, Modal } from "@mui/material"

interface PromptStartProps { 
    onYes: () => void
    onNo: () => void 
}

export const PromptStart = ({ onYes, onNo }: PromptStartProps) => (
    <>
      <Typography variant="h5"> {`Let's get you a password`} </Typography>
      <Typography> {`Your avatar is your password.`} </Typography>
      <Typography> {`Are you ready to make your avatar?`} </Typography>
      <Box>
        <Button onClick={onYes}>Yes</Button>
        <Button onClick={onNo}>No</Button>
      </Box>
    </>
)