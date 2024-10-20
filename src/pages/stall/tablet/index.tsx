import { useState, useEffect } from "react"
import { Box, Button, Typography, Paper } from "@mui/material"
import { stallStyles } from "@/sharedStyles"
import router from "next/router"

import Image from "next/image"
import { io } from "socket.io-client"
import { VisitorStatus } from "../admin"
import { socketUrl } from "../../../../socketConfig"

// router.push("/stall/tablet/character-created");

export default function StallTablet() {
  const [visitorStatus, setVisitorStatus] = useState<VisitorStatus>("idle");
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  
  useEffect (()=>{
    const newSocket = io (socketUrl)
    setSocket (newSocket)

    newSocket.on('setVisitorStatus', (newVisitorStatus) => {
      console.log ('setVisitorStatus triggered with newVisitorStatus:', newVisitorStatus)
      if (newVisitorStatus === 'characterCreationRequested')
        setVisitorStatus ('characterCreationRequested')

      if (newVisitorStatus === 'characterCreationOngoing'){
        console.log ('proceeding to character creation')
        router.push("/stall/tablet/character-creation/animal")
      }
    })

  },[])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: stallStyles.backgroundColor,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 4,
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: stallStyles.cardBackgroundColor,
          alignItems: "center",
        }}
      >
        <Box
          borderRadius={150}
          overflow={"hidden"}
          marginBottom={5}
          sx={{
            width: 200,
            height: 200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image width={200} height={200} src="/images/joutho.png" alt="Joutho Image" />
        </Box>

        <Typography variant="h4" fontWeight={"Bold"} gutterBottom fontFamily={"Monospace"}>
          Welcome to Joutho!
        </Typography>
        <Typography fontSize={20} fontFamily={"Monospace"}>
          Tap below to learn more.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            if (socket)
              socket.emit ('requestUpdateVisitorStatus', 'characterCreationRequested')
            else
              console.error ('socket not ready')
          }}
          sx={{
            mt: 3,
            ...stallStyles.button,
            backgroundColor: stallStyles.buttonBackgroundColor,
            fontFamily: "Monospace",
          }}
        > 
          {
            visitorStatus === "idle"
            ? 'What am I?'
            : 'Loading...'
          }
        </Button>
      </Paper>
    </Box>
  );
}
