import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { commonStyles } from "@/sharedStyles";
import { Player } from "@lottiefiles/react-lottie-player";

export default function CharacterCreationDone() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 6-second loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

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
        justifyContent: "center", // Center vertically
      }}
    >
      <Typography
        fontWeight={'bold'}
        textAlign="center"
        variant="h4"
        fontFamily="Monospace"
        color={commonStyles.colors.veryDarkBrown}
      >
        { loading ? `Generating Avatar...` : `Welcome to the Joutho Network, Shohan!`}
      </Typography>

      {loading ? (
        // Show a spinner during the loading period
        <Player
          autoplay
          loop
          src={`/animations/loading.json`}
        />
      ) : (
        // Show the image after the loading period
        <Image src={'/images/avatar/owl earth shield health.jpg'} alt={'avatar'} width={580} height={580} />
      )}
    </Box>
  );
}
