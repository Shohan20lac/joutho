import { Box } from "@mui/material";
import { TalkingPillowHolderState, TalkingPillowState } from "@/types";

interface SlidingPillowProps {
  talkingPillowState: TalkingPillowState | null;
  onChangeState: (state: TalkingPillowState) => void;
}

const TalkingPillow = ({ talkingPillowState, onChangeState }: SlidingPillowProps) => {
    const {WILL_TALK, IS_TALKING} = TalkingPillowHolderState
    const adminState = talkingPillowState?.admin;
    const visitorState = talkingPillowState?.visitor;
  
    const getPillowPosition = () =>             
        adminState   === WILL_TALK || adminState   === IS_TALKING ? "85%" :
        visitorState === WILL_TALK || visitorState === IS_TALKING ? "15%" :
        "50%"

    return (
        <Box
        sx={{
            position: "relative",
            width: "100%", // Full width of the parent Box
            height: "50px", // Height of the sliding area
            margin: "20px 0",
            backgroundColor: "#f5f5dc", // Neutral background to simulate a dialog stage
            borderRadius: "25px",
            overflow: "hidden",
        }}
        >
        {/* Sliding Pillow */}
        <Box
            sx={{
            position: "absolute",
            top: "50%",
            left: getPillowPosition(), // Dynamic position based on the logic
            transform: "translate(-50%, -50%)", // Center the pillow
            width: "80px",
            height: "40px",
            backgroundColor: "#ffd700", // Golden color for the pillow
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "left 0.5s ease", // Smooth slide animation
            }}
        />
        </Box>
    );
};

export default TalkingPillow