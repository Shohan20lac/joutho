import { Box, Button, Grid, Grid2, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import PasswordThumbnail from "./PasswordThumbnail";
import { Dispatch, SetStateAction, useState } from "react";
import { AvatarState, VisitorState } from "@/pages/welcome";
import Image from "next/image";
import { commonStyles } from "@/sharedStyles";

interface EnterPasswordProps {
  avatarState: AvatarState
  setAvatarState: Dispatch<SetStateAction<AvatarState>>
  setVisitorState: Dispatch<SetStateAction<VisitorState>>
}

interface PasswordState {
  animal: string
  element: string
  item: string
  power: string
}

export const animals = ["hawk", "owl", "dolphin"]
export const elements = ["fire", "water", "air", "earth"]
export const items  = ["key", "compass", "shield"]
export const powers = [
    "compass-gear", "compass-heart", "compass-wealth",
    "key-gear", "key-health", "key-wealth",
    "shield-health", "shield-resistance", "shield-wealth",
  ]


const WelcomeMessage = ({ avatarState, setAvatarState, setVisitorState }: EnterPasswordProps) => {

  const [password, setPassword] = useState<PasswordState>({
    animal: "hawk",
    element: "fire",
    item: "shield",
    power: "wealth",
  });

  const images: Record<keyof PasswordState, string[]> = {
    animal: 
        animals
        .reduce (
            (acc, animal) => {
                acc.push (`/images/animal/${animal}.png`)
                return acc
            }, 
            [] as string []
        ),
    element: 
        elements
        .reduce (
            (acc, element) => {
                acc.push (`/images/element/${element}.jpg`)
                return acc
            }, 
            [] as string []
        ),
    item:
        items
        .reduce (
            (acc, item) => {
                acc.push (`/images/item/${item}.png`)
                return acc
            }, 
            [] as string []
        ),
    power: 
        powers
        .reduce (
            (acc, power) => {
                acc.push (`/images/power/${power}.jpg`)
                return acc
            }, 
            [] as string []
        ),
  };

  const handleThumbnailClick = (type: keyof PasswordState) => {
    setPassword((prevPassword) => {
      const imageArray = images[type];
      const currentIndex = imageArray.findIndex((img) => img.includes(prevPassword[type]));
      const nextIndex = (currentIndex + 1) % imageArray.length;
  
      return {
        ...prevPassword,
        [type]: imageArray[nextIndex],
      };
    });
  };
    

  return (
    <Box sx={{ display:'flex', flexDirection:'column', textAlign: "center", width:'100%' }}>
      <KeyboardDoubleArrowLeftOutlinedIcon 
        onClick={() => {console.log ('clicked'); setVisitorState(VisitorState.ENTER_NAME)}} 
        sx={{ 
          position:'absolute',
          top: 10,
          left: 10,
          fontSize: 32,
          cursor: "pointer" ,
          color:'white',
          zIndex: 10,
        }} 
      />
      <Box
        sx={{
          alignSelf: "center",
          display: 'flex',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          padding: 1,
          width: '90%',  // Full width
          backgroundColor: commonStyles.colors.parchment, // Brown background
          background: `linear-gradient(145deg, ${commonStyles.colors.parchmen}, ${commonStyles.colors.darkBrown})`, // Gradient background
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Drop shadow for depth
          mb: 1
        }}
      >
        <Typography 
          // fontWeight={'bold'} 
          fontSize={25} 
          fontFamily={'monospace'}
          fontWeight={'bold'}
          sx={{ 
            textAlign: "center", 
            color: commonStyles.colors.darkBrown,
            // textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          {`hello, ${avatarState.name}!`}
        </Typography>
      </Box>
        
        <Box sx={{
          borderRadius: 4,
          // maxWidth: '80%',  // Full width
          padding: '20px', // Give enough padding for the text
          backgroundColor: commonStyles.colors.brown, // Brown background
          background: `linear-gradient(145deg, ${commonStyles.colors.brown}, ${commonStyles.colors.darkBrown})`, // Gradient background
          // boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Drop shadow for depth
          mb: 2,
          ml: 2,
          mr: 2,
          border: `2px solid ${commonStyles.colors.darkBrown}`
        }}>
          <Typography
            fontSize={20} 
            sx={{
              fontFamily: "monospace",
              color: "white",
              textShadow: "2px 4px 8px rgba(0, 0, 0, 0.6)",
              padding: "10px",
              borderRadius: "8px",
              // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              transform: "translateY(-2px)"
            }}
          >
            Enter Password:
          </Typography>
          
          <Grid2 container spacing={2} justifyContent="center" mt={2}>
            {Object.keys(password).map((key) => (
              <Grid item xs={4} key={key}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Drop shadow for depth
                  }}
                  onClick={() => handleThumbnailClick(key as keyof PasswordState)}
                >
                  <Image
                    src={images[key as keyof PasswordState].find((img) => img.includes(password[key as keyof PasswordState])) || ""}
                    alt="Password Thumbnail"
                    width={120}
                    height={120}
                  />
                </Box>
              </Grid>
            ))}
          </Grid2>

          
        </Box>


      <Button
        variant={ avatarState.name ? "contained" :"text"}
        onClick={() => {setVisitorState (VisitorState.ENTER_PASSWORD)}} 
        disabled={!avatarState.name} 
        sx={{ alignSelf:'center', justifySelf: 'center', mt: 2, backgroundColor: avatarState.name ? commonStyles.colors.accent : 'none', maxWidth: '80%' }}
      >
        Login
      </Button>

      <Typography
        fontFamily={'monospace'} 
        variant="caption"
        sx={{
          mt: 2,
          cursor: "pointer",
          color: 'white',
        }}
        onClick={() => {setVisitorState (VisitorState.CHARACTER_CREATION_REQUESTED)}} 
      >
        I don’t have a password yet
      </Typography>

    </Box>
  );
};

export default WelcomeMessage;
