import { Box, Button, Grid, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { AvatarState, VisitorState } from "@/pages/welcome";
import Image from "next/image";
import { commonStyles } from "@/sharedStyles";

interface EnterPasswordProps {
  avatarState: AvatarState;
  setAvatarState: Dispatch<SetStateAction<AvatarState>>;
  setVisitorState: Dispatch<SetStateAction<VisitorState>>;
}

interface PasswordState {
  animal: string;
  element: string;
  item: string;
  power: string;
}

const options = {
  animal: ["hawk", "owl", "dolphin"],
  element: ["fire", "water", "air", "earth"],
  item: ["key", "compass", "shield"],
  power: [
    "wealth",
    "heart",
    "health",
    "resistance",
    "gear"
  ],
}

const EnterPassword = ({
  avatarState,
  setVisitorState,
}: EnterPasswordProps) => {
  const [password, setPassword] = useState<PasswordState>({
    animal: "hawk",
    element: "fire",
    item: "shield",
    power: "wealth",
  });

  // Memoize pre-generated image paths
  const images = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(options).map(([key, values]) => [
          key,
          values.map((value) => `/images/${key}/${value}.jpg`),
        ])
      ) as Record<keyof PasswordState, string[]>,
    []
  );

  // Optimized thumbnail click handler
  const handleThumbnailClick = (type: keyof PasswordState) => {
    setPassword((prevPassword) => {
      const currentIndex = images[type].findIndex((img) =>
        img.includes(prevPassword[type])
      );
      const nextIndex = (currentIndex + 1) % images[type].length;

      return { ...prevPassword, [type]: options[type][nextIndex] };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
      }}
    >
      {/* Back Button */}
      <KeyboardDoubleArrowLeftOutlinedIcon
        onClick={() => setVisitorState(VisitorState.ENTER_NAME)}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 28,
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
      />

      {/* Welcome Message */}
      <Box
        sx={{
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          padding: 1,
          width: "90%",
          background: `linear-gradient(145deg, ${commonStyles.colors.parchment}, ${commonStyles.colors.darkBrown})`,
          mb: 1,
        }}
      >
        <Typography
          fontSize={20}
          fontFamily="monospace"
          fontWeight="bold"
          sx={{ textAlign: "center", color: commonStyles.colors.darkBrown }}
        >
          {`Hello, ${avatarState.name}!`}
        </Typography>
      </Box>

      {/* Password Selection */}
      <Box
        sx={{
          borderRadius: 4,
          padding: "20px",
          background: `linear-gradient(145deg, ${commonStyles.colors.brown}, ${commonStyles.colors.darkBrown})`,
          mb: 2,
          ml: 2,
          mr: 2,
          border: `2px solid ${commonStyles.colors.darkBrown}`,
        }}
      >
        <Typography
          fontSize={18}
          sx={{
            fontFamily: "monospace",
            color: "white",
            textShadow: "1px 2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          Enter Password:
        </Typography>

        {/* Thumbnails */}
        <Grid container spacing={2} justifyContent="center" mt={2}>
          {Object.keys(password).map((key) => (
            <Grid item xs={6} key={key}>
              <Box
                sx={{
                  borderRadius: "8px",
                  cursor: "pointer",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                }}
                onClick={() => handleThumbnailClick(key as keyof PasswordState)}
              >
                <Image
                  src={images[key as keyof PasswordState].find((img) =>
                    img.includes(password[key as keyof PasswordState])
                  ) || ""}
                  alt={`${key} thumbnail`}
                  width={100} // Reduced size for weaker devices
                  height={100} // Reduced size for weaker devices
                  loading="lazy" // Lazy load images
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Login Button */}
      <Button
        variant={avatarState.name ? "contained" : "text"}
        onClick={() => setVisitorState(VisitorState.ENTER_PASSWORD)}
        disabled={!avatarState.name}
        sx={{
          alignSelf: "center",
          mt: 2,
          backgroundColor: avatarState.name ? commonStyles.colors.accent : "none",
          maxWidth: "80%",
        }}
      >
        Login
      </Button>

      {/* Password Not Available */}
      <Typography
        fontFamily="monospace"
        variant="caption"
        sx={{
          mt: 2,
          cursor: "pointer",
          color: "white",
        }}
        onClick={() => setVisitorState(VisitorState.CHARACTER_CREATION_PROMPTED)}
      >
        I don’t have a password yet
      </Typography>
    </Box>
  );
};

export default EnterPassword;
