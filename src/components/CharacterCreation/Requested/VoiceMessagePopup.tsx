import { AudioMessage, TalkingPillowState } from "@/types";
import { Box, Button, Typography } from "@mui/material";

interface VoiceMessagePopupProps {
    message: AudioMessage;
    onPlay: () => void;
    isPlaying: boolean;
    onStop: () => void;
}

export const VoiceMessagePopup = ({
    message,
    onPlay,
    isPlaying,
    onStop,
}: VoiceMessagePopupProps) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
                {message.sender === TalkingPillowState.IS_TALKING ? "Admin" : "Visitor"}'s Voice Message
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button variant="contained" onClick={onPlay}>
                    {isPlaying ? "Pause" : "Play"}
                </Button>
                {isPlaying && <Button variant="contained" onClick={onStop}>Stop</Button>}
            </Box>
        </Box>
    );
};
