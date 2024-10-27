import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import PasswordThumbnail from "./PasswordThumbnail";
import { useState } from "react";
import { commonStyles } from "@/sharedStyles";

interface WelcomeCardProps {
    firstName: any
    setFirstName: any
    onContinue: any
}

interface PasswordState {
    animal: string
    element: string
    item: string
    power: string
}

export const animals = ["owl", "owl", "dolphin"]
export const elements = ["fire", "water", "air", "earth"]
export const items  = ["key", "compass", "shield"]
export const powers = [
    "compass gear", "compass heart", "compass wealth",
    "key gear", "key health", "key wealth",
    "shield health", "shield resistance", "shield wealth",
  ]

const WelcomeCard = ({ firstName, setFirstName, onContinue }: WelcomeCardProps) => {
  const [password, setPassword] = useState<PasswordState>({
    animal: "owl",
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
                acc.push (`/images/item/${power}.jpg`)
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
    <Paper elevation={4} sx={{ padding: 4, maxWidth: 500, textAlign: "center", backgroundColor: commonStyles.colors.parchment }}>
      <Typography variant="h5">Welcome to Joutho!</Typography>
      <TextField
        label="Enter First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={{ mt: 2, mb: 3 }}
      />

      {/* Password Thumbnails */}
      <Typography>Enter password:</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        {Object.keys(password).map((key) => (
          <PasswordThumbnail
            key={key}
            image={images[key as keyof PasswordState].find(img => img.includes(password[key as keyof PasswordState])) || ""}
            onClick={() => handleThumbnailClick(key as keyof PasswordState)}
          />
        ))}
      </Box>

      <Button variant="contained" fullWidth onClick={onContinue} disabled={!firstName} sx={{ mt: 2 }}>
        Continue
      </Button>

      <Typography variant="caption" sx={{ mt: 2, textDecoration: "underline", cursor: "pointer" }}>
        I don’t have a password yet
      </Typography>
    </Paper>
  );
};

export default WelcomeCard;

