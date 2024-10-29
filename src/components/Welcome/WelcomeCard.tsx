import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { AvatarState, VisitorState } from "@/pages/welcome";
import { Dispatch, SetStateAction } from "react";
import Image from 'next/image';  // Import Image from Next.js

interface WelcomeCardProps {
  avatarState: AvatarState
  setAvatarState:  Dispatch<SetStateAction<AvatarState>>
  setVisitorState: Dispatch<SetStateAction<VisitorState>>
}


const WelcomeCard = ({ avatarState, setAvatarState, setVisitorState }: WelcomeCardProps) => {

  return (
    <Paper elevation={4} sx={{ padding: 4, maxWidth: 500, textAlign: "center", backgroundColor: commonStyles.colors.parchment, margin: '10px' }}>
      <Box 
        sx={{
          display: 'flex',
          alignSelf: 'center',
          justifySelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: 150,          // Set a fixed width
          height: 150,         // Set a fixed height to match the width
          borderRadius: '50%', // Makes the container round
          overflow: 'hidden',  // Ensures the image is clipped to the circular shape
          backgroundColor: commonStyles.colors.lightBrown,
          border: `4px solid ${commonStyles.colors.lightBrown}`
        }}>
        <Image src={'/images/joutho.jpg'} alt='joutho' width={150} height={150}/>
      </Box>

      <Typography color={commonStyles.colors.veryDarkBrown} fontFamily={'monospace'} fontSize={28} fontWeight='bold' sx={{mb: 1}}> Welcome to Joutho!</Typography>
      <Typography fontFamily={'monospace'} sx={{ whiteSpace: "pre-line", mb: 3 }}>{'A platform for connecting \n lifelong acts of kindness.'}</Typography>
      <Typography color={commonStyles.colors.darkBrown} fontFamily={'monospace'} fontWeight='bold' fontSize={20} sx={{ whiteSpace: "pre-line" }}>{'Who are you?'}</Typography>

      <TextField
        variant="standard"
        fullWidth
        value={avatarState.name}
        onChange={(e) => setAvatarState({
          ...avatarState,
          name: e.target.value
        })}
        sx={{ mt: 2, mb: 3}}
        slotProps={{
          input: {
            style: { textAlign: 'center' } // Center text inside TextField
          }
        }}
      />

      <Button  
        variant={ avatarState.name ? "contained" :"text"}
        onClick={() => {setVisitorState (VisitorState.ENTER_PASSWORD)}} 
        disabled={!avatarState.name} 
        sx={{ mt: 2, backgroundColor: avatarState.name ? commonStyles.colors.accent : 'none' }}
      >
        Continue
      </Button>
    </Paper>
  );
};

export default WelcomeCard;

