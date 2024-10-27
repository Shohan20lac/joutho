import { useState } from "react";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { commonStyles } from "@/sharedStyles";
import WelcomeCard from "@/components/WelcomeCard";
import WelcomeMessage from "@/components/WelcomeMessage";

const breathingEffect = keyframes`
  0% { background-color: ${commonStyles.colors.darkBrown}; }
  50% { background-color: ${commonStyles.colors.darkGreen}; }
  100% { background-color: ${commonStyles.colors.darkBrown}; }
`;

export default function Welcome() {
  const [firstName, setFirstName] = useState("");
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);

  const handleContinue = () => {
    if (firstName) {
      setShowWelcomeCard(false);
    }
  };

  const handleBack = () => {
    setShowWelcomeCard(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        animation: showWelcomeCard ? '' : `${breathingEffect} 5s ease-in-out infinite`,
      }}
    >
      {
        showWelcomeCard 
        ? <WelcomeCard    firstName={firstName} setFirstName={setFirstName} onContinue={handleContinue} />
        : <WelcomeMessage firstName={firstName} onBack={handleBack} />
      }
    </Box>
  );
}
