import { AudioMessage } from "@/types";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

interface VoiceMessagePopupProps {
    message: AudioMessage;
    onPlay: () => void;
    isPlaying: boolean;
    onStop: () => void;
}

export const VoiceMessagePopup = ({message, onPlay, isPlaying, onStop}: VoiceMessagePopupProps) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
                {message.sender}'s Voice Message
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton color="primary" onClick={onPlay}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                {isPlaying && (
                    <IconButton color="secondary" onClick={onStop}>
                        <StopIcon />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};
