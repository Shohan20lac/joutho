// pages/stall/character-creation/animal.tsx
import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { commonStyles } from "@/sharedStyles";
import { io } from "socket.io-client";
import { AvatarState } from "../../admin";

const animalOptions = ["hawk", "owl", "dolphin"];
export type CardSelectionStatus = "selecting" | "requested" | "confirmed" | null

export default function AnimalSelection() {
  const [animalSelectionStatus, setAnimalSelectionStatus] = useState <CardSelectionStatus> ("selecting")
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const router = useRouter()
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  useEffect (()=>{
    const newSocket = io ('http://192.168.68.123:3001');
    setSocket (newSocket)

    newSocket.on ('updateAnimalSelection', ({newAnimal, newStatus}) => {
      setSelectedAnimal (newAnimal)
      setAnimalSelectionStatus (newStatus)

      if (newStatus === 'confirmed')
        router.push("/stall/tablet/character-creation/element")
    })
  },[])

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 3, backgroundColor: commonStyles.colors.lightBrown, height: '85vh' }}>
      <Box
        sx={{
          alignSelf: "center",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          width: '92%',  // Full width
          padding: '20px', // Give enough padding for the text
          backgroundColor: commonStyles.colors.brown, // Brown background
          background: `linear-gradient(145deg, ${commonStyles.colors.brown}, ${commonStyles.colors.darkBrown})`, // Gradient background
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Drop shadow for depth
          marginBottom: 4,
        }}
      >
        <Typography 
          // fontWeight={'bold'} 
          fontSize={43} 
          fontFamily={'monospace'} 
          sx={{ 
            textAlign: "center", 
            color: "white",
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          {
            selectedAnimal === 'hawk' ? 'Are you a Hawk?' :
            selectedAnimal === 'owl' ? 'Are you an Owl?' :
            selectedAnimal === 'dolphin' ? 'Are you a Dolphin?' 
            : 'Are you a Hawk, Owl, or Dolphin?'
          }
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {animalOptions.map((animal) => (
          <Grid item xs={4} key={animal}>
            <Box
              onClick={() => {
                if (socket)
                  socket.emit ('requestAnimal', animal)
                setSelectedAnimal (animal);
              }}
              sx={{
                borderRadius: "10px",
                padding: "8px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: selectedAnimal === animal ? "green" : "none",
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)', // Subtle zoom effect on hover
                  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                },
              }}
            >
              <Image src={`/images/animal/${animal}.png`} alt={animal} width={280} height={280} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
