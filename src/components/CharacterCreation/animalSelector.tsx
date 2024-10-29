import { Box, Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { AvatarState, VisitorState } from "@/pages/welcome";
import { commonStyles } from "@/sharedStyles"
import { Animal } from "@/const/avatar.const"
import Image from 'next/image';


interface AnimalSelectorProps {
  avatarState: AvatarState
  setAvatarState: Dispatch<SetStateAction<AvatarState>>
}

const AnimalSelector = ({ avatarState, setAvatarState }: AnimalSelectorProps) => {
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
            avatarState.animal === Animal.HAWK    ? 'Are you a Hawk?' :
            avatarState.animal === Animal.OWL     ? 'Are you an Owl?' :
            avatarState.animal === Animal.DOLPHIN ? 'Are you a Dolphin?' 
            : 'Are you a Hawk, Owl, or Dolphin?'
          }
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {
          [Animal.HAWK, Animal.OWL, Animal.DOLPHIN]
          .map ((animal) => (
            <Grid item xs={4} key={animal}>
              <Box
                onClick={() => {
                  setAvatarState({
                    ...avatarState,
                    animal: animal
                  })
                }}
                sx={{
                  borderRadius: "10px",
                  padding: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: avatarState.animal === animal ? "green" : "none",
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)', // Subtle zoom effect on hover
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                  },
                }}
              >
                <Image src={`/images/animal/${avatarState.animal}.png`} alt={animal} width={280} height={280} />
              </Box>
            </Grid>
        ))}
      </Grid>
    </Box>

    )
}

export default AnimalSelector