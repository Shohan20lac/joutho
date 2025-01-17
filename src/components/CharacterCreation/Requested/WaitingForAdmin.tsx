import { Paper, Typography, Button, Box, Switch, Modal } from "@mui/material"
import Bubble from "./Bubble"
import { UserStatus } from "@/utils"

export const WaitingForAdmin = () => (
    <>
      <Typography variant="h6">An admin will be with you shortly.</Typography>
      <Box>
        <Bubble image={null} label="Visitor" status={UserStatus.ACTIVE} />
        <Bubble image={null} label="" status={UserStatus.INACTIVE} />
      </Box>
    </>
)