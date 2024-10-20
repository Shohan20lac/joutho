import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { commonStyles } from "@/sharedStyles";
import { CardSelectionStatus } from "./animal";
import { io } from "socket.io-client";
import { Player } from '@lottiefiles/react-lottie-player';
import { socketUrl } from "../../../../../socketConfig";

const elementOptions = ["fire", "water", "earth", "air"];

export default function ElementSelection() {
  const [elementSelectionStatus, setElementSelectionStatus] = useState<CardSelectionStatus>("selecting");
  const [selectedElement, setSelectedElement] = useState<string>("");
  const router = useRouter();
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    const newSocket = io (socketUrl)
    setSocket(newSocket)

    newSocket.on('updateElementSelection', ({ newElement, newStatus }) => {
      console.log('updateElementSelection triggered with', newElement, newStatus);
      setSelectedElement(newElement);
      setElementSelectionStatus(newStatus);

      if (newStatus === 'confirmed') router.push ("/stall/tablet/character-creation/item");
    });
  }, []);

  console.log ('@element: selectedElement', selectedElement)

  return (
    <Box
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        gap: 3,
        backgroundColor: commonStyles.colors.lightBrown,
        height: '85vh',
      }}
    >
      {/* CardsContainer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          height: "100%",
        }}
      >
        <Grid 
          container 
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          {elementOptions.map((element) => (
            <Grid 
              item 
              xs={6}
              display="flex"
              justifyContent="center"
              key={element}
            >
              <Box
                onClick={() => {
                  if (socket) socket.emit('requestElement', element);
                  setSelectedElement(element);
                }}
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "8px",
                  background: 
                  selectedElement === element 
                  ? "linear-gradient(145deg, green, grey)" // Gradient lighter grey when not selected
                  : "linear-gradient(145deg, grey, #1c1c1c)",  // Gradient dark grey when selected
                  // commonStyles.colors.lightBrown, // Dark brown background
                  // , // Dark brown background
                  borderRadius: "10px",  // Optional: Add rounded corners for a smoother look
                  boxShadow: selectedElement === element 
                    ? '0px 4px 10px rgba(0, 255, 0, 0.5)'  // Optional: Shadow effect when selected
                    : '0px 2px 6px rgba(0, 0, 0, 0.4)',   // Subtle shadow when not selected
                }}
              >
                <Image src={`/images/element/${element}.png`} alt={element} width={240} height={240} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* TextContainer */}
      <Box
        sx={{
          marginTop: '50px',
          marginBottom: '50px',
          padding: '20px',
          display: "flex",
          flexDirection: "column",
          borderRadius: '15px',
          background: `linear-gradient(145deg, ${commonStyles.colors.darkBrown}, ${commonStyles.colors.veryDarkBrown})`,
          border: `2px solid ${commonStyles.colors.veryDarkBrown}`,
          width: "40%",
          justifyContent: "flex-start",
        }}
        >
        {/* veryDarkBrown Container */}
        <Box 
          sx={{ 
            backgroundColor: commonStyles.colors.veryDarkBrown, 
            padding: '20px', 
            borderRadius: '10px',
            // boxShadow: 'inset 0px 4px 8px rgba(0, 0, 0, 0.6), 0px 4px 15px rgba(0, 0, 0, 0.3)',
            boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.3)', // Inner shadow for depth
            border: `1px solid ${commonStyles.colors.darkBrown}`
          }}
        >
          <Typography sx={{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)'}} fontWeight={'bold'} fontSize={25} color="white" textAlign="center" fontFamily={'monospace'}>
            {`Are you Fire, Water, Air, or Earth?`}
          </Typography>
        </Box>

        {/* Flame Animation */}
        {selectedElement && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))', // Drop shadow for the flame
            }}
          >
            <Player
              autoplay
              loop
              src={`/animations/${selectedElement}.json`}
              style={{
                marginTop: 
                  selectedElement==="air" ? "0px" :
                  selectedElement==="earth" ? "80px" :
                  selectedElement==="fire" ? "70px" 
                  : "10px",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
