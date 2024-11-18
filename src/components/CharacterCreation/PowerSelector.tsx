import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { commonStyles } from "@/sharedStyles";
import { getItemPowerDescription, getItemPowerPath, ItemType, PowerType } from "@/utils/stall.utils";
import { io } from "socket.io-client";
import { socketUrl } from "../../../socketConfig";

const powerOptions: PowerType[] = ["wealth", "gear", "health"];

export default function PowerSelection() {
  const [powerSelectionStatus, setPowerSelectionStatus] = useState<CardSelectionStatus>("selecting");
  const [selectedPower, setSelectedPower] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const router = useRouter();
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)

  useEffect(() => {
    const newSocket = io(socketUrl)
    setSocket(newSocket);

    newSocket.on ('gotStallActivity', (stallActivity) => {
      setSelectedItem (stallActivity.selectedItem)
      setSelectedPower (stallActivity.selectedPower)
    })

    newSocket.on('updatePowerSelection', ({ newPower, newStatus }) => {
      setSelectedPower(newPower);
      setPowerSelectionStatus(newStatus);

      if (newStatus === 'confirmed') router.push("/stall/tablet/character-creation/done");
    });

    newSocket.on ('updateItemSelection', ({ newValue, newStatus }) => {
      setSelectedPower(newValue);
      setPowerSelectionStatus(newStatus);

      if (newStatus === 'confirmed') {
        router.push("/stall/tablet/character-creation/done");
      }
    })
  }, [])

  if (socket)
    socket.emit ("getStallActivity")

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: commonStyles.colors.lightBrown,
        height: '85vh',
        justifyContent: "center",  // Centers content vertically
        alignItems: "center",      // Centers content horizontally
      }}
    >
      {/* Brown Container for the Heading */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          width: '92%',  // Full width
          padding: '30px', // Give enough padding for the text
          backgroundColor: commonStyles.colors.brown, // Brown background
        }}
      >
        <Typography fontFamily={'monospace'} variant="h4" sx={{ textAlign: "center", color: "white" }}>
          {selectedItem ? `Choose a magic power for your ${selectedItem}` : "Pick a power for your item"}
        </Typography>
      </Box>

      {/* Grid for the powers */}
      <Grid 
        container 
        spacing={5} 
        justifyContent="center" // Centers the grid horizontally
        alignItems="center"     // Aligns the items inside grid vertically
        sx={{ width: '100%', height:"90%" }}  // Ensures the grid takes up the full width
      >
        {powerOptions.map((power: PowerType) => {
          console.log ('got itemPowerDescription', getItemPowerPath (selectedItem as ItemType, power))
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={power}>  {/* Use xs={3} for 4 columns */}
              <Box
                onClick={() => {
                  if (socket) socket.emit('requestPower', power);
                  setSelectedPower (selectedItem === 'shield' && power === 'gear' ? 'resistance' : power)
                }}
                sx={{
                  height: '430px',
                  width: '300px',
                  textAlign: "center",
                  cursor: "pointer",
                  border:
                    selectedPower === power
                      ? powerSelectionStatus === 'requested'
                        ? "2px solid green"
                        : "1px solid gray"
                      : "none",
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 10,
                  background: `linear-gradient(145deg, ${commonStyles.colors.darkBrown}, ${commonStyles.colors.veryDarkBrown})`, // Gradient background
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)', // Outer shadow for realism
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)', // Subtle zoom effect on hover
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                  },
                }}
              >
                <Image src={getItemPowerPath(selectedItem, power)} alt={power} width={180} height={180} />
                <Typography padding={2} marginTop={2} color='white' fontFamily={'monospace'} fontSize={20}>
                  {getItemPowerDescription(selectedItem as ItemType, power)}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}
