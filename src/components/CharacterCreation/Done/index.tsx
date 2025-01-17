import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { commonStyles } from "@/sharedStyles";
import { Player } from "@lottiefiles/react-lottie-player";
import { AvatarState } from "../../../utils";
import { io } from "socket.io-client";
import { socketUrl } from "../../../../socketConfig";

export default function CharacterCreationDone() {
  const [loading, setLoading] = useState(true);
  const [avatarState, setAvatarState] = useState<AvatarState>({
    name: '',
    animal: '',
    animalSelectionStatus: 'confirmed',
    
    element: '',
    elementSelectionStatus: 'confirmed',
    
    item: '',
    itemSelectionStatus: 'confirmed',
    
    power: '',
    powerSelectionStatus: 'confirmed'
  })
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [getAvailabilityMatrix, setAvailabilityMatrix] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect (()=>{
    const newSocket = io (socketUrl)
    setSocket (newSocket)

    newSocket.on('connect', () => {
      newSocket.emit("getStallActivity")
      newSocket.emit('getAvailableCombination', {
        animal: 'hawk',    // Example values, replace with your actual data
        element: 'air',
        item: 'fire',
        power: 'shield'
      });
    })

    newSocket.on ('gotStallActivity', (stallActivity) => {
      console.log ('@stallTablet: gotStallActivity', stallActivity)
      setAvatarState ({
        name: stallActivity.name,

        animal: stallActivity.selectedAnimal,
        animalSelectionStatus: stallActivity.selectedAnimalStatus,

        element: stallActivity.selectedElement,
        elementSelectionStatus: stallActivity.selectedElementStatus,

        item: stallActivity.selectedItem,
        itemSelectionStatus: stallActivity.selectedItemStatus,

        power: stallActivity.selectedPower,
        powerSelectionStatus: stallActivity.selectedPowerStatus
      })
      newSocket.emit('getAvailableCombination', {
        animal: stallActivity.selectedAnimal,    // Example values, replace with your actual data
        element: stallActivity.selectedElement,
        item: stallActivity.selectedItem,
        power: stallActivity.selectedPower
      });
    })

    newSocket.on ('gotAvailabilityMatrix', (availabilityMatrix) => {
      console.log ('@stallTablet: gotAvailabilityMatrix', availabilityMatrix)
      setAvailabilityMatrix (availabilityMatrix)
    })

    newSocket.on ('gotAvailableCombination', (availableCombination) => {
      console.log ('@stallTablet: gotAvailableCombination', availableCombination)
      setAvatarUrl (`/images/avatar/${availableCombination}.jpg`)
      newSocket.emit('registerNewVisitor', avatarState.name + availableCombination)
    })
  },[])
  

  useEffect(() => {
    // Simulate a 6-second loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [])

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        backgroundColor: commonStyles.colors.lightBrown,
        height: '85vh',
        justifyContent: "center",
      }}
    >
      <Typography
        fontWeight={'bold'}
        textAlign="center"
        variant="h4"
        fontFamily="Monospace"
        color={commonStyles.colors.veryDarkBrown}
      >
        { loading ? `Generating Avatar...` : `Welcome to the Joutho Network, ${avatarState.name}!` }
      </Typography>

      {
        loading 
        ? 
          <Player
            autoplay
            loop
            src={`/animations/loading.json`}
          /> 
        :
          <Image 
            src={avatarUrl} 
            alt={'avatar'} 
            width={580} 
            height={580} 
          />
      }
    </Box>
  );
}
