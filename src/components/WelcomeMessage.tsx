import { Box, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

interface WelcomMessageProps {
    firstName: string
    onBack: any
}

const WelcomeMessage = ({ firstName, onBack }: WelcomMessageProps) => {
  return (
    <Box sx={{ position: "relative", textAlign: "center" }}>
      <KeyboardDoubleArrowLeftOutlinedIcon onClick={onBack} sx={{ fontSize: 32, position: "absolute", top: 10, left: 10, cursor: "pointer" }} />

      <Typography
        variant="h4"
        sx={{
          color: "white",
          textShadow: "2px 4px 8px rgba(0, 0, 0, 0.6)",
          border: "2px solid #4b9cd3",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "black",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          transform: "translateY(-2px)",
        }}
      >
        {`Hello, ${firstName}!`}
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
