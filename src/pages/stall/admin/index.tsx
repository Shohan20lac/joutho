import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Grid, TextField } from "@mui/material"
import { stallStyles } from "@/sharedStyles"
import { io } from "socket.io-client";
// import { CardSelectionStatus } from "../tablet/character-creation/animal";
import { socketUrl } from "../../../../socketConfig";
import { SelectionStatus } from "@/utils/selection.utils";

export type VisitorStatus = 
  "idle" 
  | "characterCreationRequested" 
  | "characterCreationOngoing"
  | "characterCreationSuccess"

export interface AvatarState {
  name: string 
  animal: string
  animalSelectionStatus: SelectionStatus

  element: string
  elementSelectionStatus: SelectionStatus

  item: string
  itemSelectionStatus: SelectionStatus

  power: string
  powerSelectionStatus: SelectionStatus
}

export default function StallAdmin() {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [visitorStatus, setVisitorStatus] = useState<VisitorStatus>("idle");
  
  const [avatarState, setAvatarState] = useState<AvatarState> ({
    name: "",
    animal: "",
    animalSelectionStatus: SelectionStatus.IDLE,
    element: "",
    elementSelectionStatus: SelectionStatus.IDLE,
    item: "",
    itemSelectionStatus: SelectionStatus.IDLE,
    power: "",
    powerSelectionStatus: SelectionStatus.IDLE,
  })

  useEffect (()=>{
    const newSocket = io (socketUrl)
    setSocket (newSocket)

    newSocket.on ('setVisitorStatus', (newVisitorStatus) => setVisitorStatus (newVisitorStatus))
    newSocket.on ('updateAnimalSelection',  ({newAnimal,  newStatus}) => setAvatarState ({...avatarState, animal:  newAnimal,  animalSelectionStatus:  newStatus }))
    newSocket.on ('updateElementSelection', ({newElement, newStatus}) => setAvatarState ({...avatarState, element: newElement, elementSelectionStatus: newStatus }))
    newSocket.on ('updateItemSelection',    ({newItem,    newStatus}) => {
      console.log ('@stallAdmin: updateItemSelection triggered with', newItem, newStatus)
      setAvatarState ({...avatarState, item:    newItem,    itemSelectionStatus:    newStatus })
    })
    newSocket.on ('updatePowerSelection',   ({newPower,   newStatus}) => setAvatarState ({...avatarState, power:   newPower,   powerSelectionStatus:   newStatus }))

  },[])

  const getTileColor = (selectionStatus: SelectionStatus, value: string) => 
    selectionStatus === SelectionStatus.REQUESTED ? "orange" : 
    selectionStatus === SelectionStatus.APPROVED ? "green" : 
    "grey"

  console.log ('@StallAdmin: avatarState:', avatarState)
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
          maxWidth: 800,
          textAlign: "Left",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {"Visitor"}
        </Typography>

        <Typography>{"visitorStatus: " + visitorStatus}</Typography>

        {visitorStatus === "characterCreationOngoing" && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {
              <>
                <TextField
                  label="Enter Visitor Name"
                  variant="outlined"
                  fullWidth
                  value={avatarState.name}
                  onChange={(e: any) => setAvatarState({
                    ...avatarState,
                    name: e.target.value,
                  })}
                  sx={{ mb: 3 }}
                />
                <Button onClick={()=>{
                  console.log ('@StallAdmin: about to emit updateVisitorName', avatarState.name)
                  if (socket)
                    socket.emit ("updateVisitorName", avatarState.name)
                  else
                    console.error("socket not ready")
                }}> {"Save"}</Button>
              </>
            }
            {/* Animal Tile */}
            <Grid item xs={3}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: getTileColor(avatarState.animalSelectionStatus, avatarState.animal),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Typography>{avatarState.animal || ""}</Typography>
              </Box>
            </Grid>

            {/* Element Tile */}
            <Grid item xs={3}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: getTileColor(avatarState.elementSelectionStatus, avatarState.element),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Typography>{avatarState.element || ""}</Typography>
              </Box>
            </Grid>

            {/* Item Tile */}
            <Grid item xs={3}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: getTileColor(avatarState.itemSelectionStatus, avatarState.item),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Typography>{avatarState.item || ""}</Typography>
              </Box>
            </Grid>

            {/* Power Tile */}
            <Grid item xs={3}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: getTileColor(avatarState.powerSelectionStatus, avatarState.power),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                }}
              >
                <Typography>{avatarState.power || ""}</Typography>
              </Box>
            </Grid>
          </Grid>
        )}

        {visitorStatus === "characterCreationRequested" && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                if (socket){
                  console.log ('about to emit')
                  socket.emit ("requestUpdateVisitorStatus", "characterCreationOngoing")
                }
                else 
                  console.error("socket not ready");
              }}
              sx={{ mt: 3, ...stallStyles.button }}
            >
              {`Start Character Creation`}
            </Button>
          </Grid>
        )}

        {
          avatarState.animal && avatarState.animal.length > 0
          ?
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  if (socket)
                    socket.emit ("confirmAnimal", avatarState.animal)
                  else
                    console.error("socket not ready")
                }}
                sx={{ mt: 3, ...stallStyles.button }}
              >
                Approve Animal: {avatarState.animal}
              </Button>
            </Grid>
          :
            null
        }

        {avatarState.element && avatarState.element.length > 0 ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                if (socket)
                  socket.emit ("confirmElement", avatarState.element)
                else
                  console.error("socket not ready")
              }}
              sx={{ mt: 3, ...stallStyles.button }}
            >
              Approve Element: {avatarState.element}
            </Button>
          </Grid>
        ): null}

        {avatarState.item && avatarState.item.length > 0 ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={() => {
                if (socket)
                  socket.emit ("confirmItem", avatarState.item)
                else
                  console.error("socket not ready")
              }}
              sx={{ mt: 3, ...stallStyles.button }}
            >
              Approve Item: {avatarState.item}
            </Button>
          </Grid>
        ): null}

        {avatarState.power && avatarState.power.length > 0 ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => {
                if (socket)
                  socket.emit ("confirmPower", avatarState.power)
                else
                  console.error("socket not ready")
              }}
              sx={{ mt: 3, ...stallStyles.button }}
            >
              Approve Power: {avatarState.power}
            </Button>
          </Grid>
        ): null}

        {avatarState.animal &&
          avatarState.element &&
          avatarState.item &&
          avatarState.power && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => {
                  if (socket)
                    socket.emit("requestFinishCharacterCreation");
                  else
                    console.error("socket not ready")
                }}
                sx={{ mt: 3, ...stallStyles.button }}
              >
                Approve Character Creation
              </Button>
            </Grid>
          )}
      </Paper>
    </Box>
  );
}
