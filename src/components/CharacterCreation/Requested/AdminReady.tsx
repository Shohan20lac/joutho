import { Paper, Typography, Button, Box, Modal } from "@mui/material";
import { TalkingPillow } from "./TalkingPillow";
import { VoiceMessagePopup } from "./VoiceMessagePopup";
import { useState } from "react";
import { AudioMessage, TalkingPillowHolderState, TalkingPillowRole, TalkingPillowState } from "@/types";

interface AdminReadyProps {
    adminName: string;
}

const {WILL_TALK, IS_TALKING, IS_LISTENING} = TalkingPillowHolderState

const AdminReady = ({ adminName }: AdminReadyProps) => {
    
    const [voiceMessages, setVoiceMessages] = useState<AudioMessage[]>([]);
    const [currentPlayingMessage, setCurrentPlayingMessage] = useState<number | null>(null);

    // Handle voice message recording
    const handleVoiceMessage = (audioBlob: Blob, sender: TalkingPillowState) => {
        setVoiceMessages((prevMessages) => [
            ...prevMessages,
            { sender, audio: audioBlob },
        ]);
    };

    // Handle playing a voice message
    const playVoiceMessage = (index: number) => {
        setCurrentPlayingMessage(index);
    };

    // Handle stopping the voice message
    const stopVoiceMessage = () => {
        setCurrentPlayingMessage(null);
    };

    // Change the talking pillow state
    const changeTalkingPillowState = (role: TalkingPillowRole, newState: TalkingPillowState) => {
        setTalkingPillowState ((prevState: any) => ({
            ...prevState,
            [`${role}PillowState`]: newState,
        }))
    }

    return (
        <Paper sx={{ padding: 4, maxWidth: 500, margin: "10px auto", textAlign: "center" }}>
            <Typography variant="h6">
                {
                    
                    talkingPillowState.adminPillowState === IS_TALKING
                    ? `${adminName} is talking...`
                    : "Waiting for response..."
                }
            </Typography>

            <Box sx={{ marginTop: 2 }}>
                <TalkingPillow
                    role="admin"
                    state={talkingPillowState.adminPillowState}
                    onChangeState={(newState) => changeTalkingPillowState(TalkingPillowRole.ADMIN, newState)}
                />
                <TalkingPillow
                    role="visitor"
                    state={talkingPillowState.visitorPillowState}
                    onChangeState={(newState) => changeTalkingPillowState(TalkingPillowRole.VISITOR, newState)}
                />
            </Box>

            <Box sx={{ marginTop: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => handleVoiceMessage(new Blob(["audio data"]), TalkingPillowState.IS_TALKING)}
                >
                    Record Voice Message
                </Button>
            </Box>

            <Box sx={{ marginTop: 2 }}>
                {voiceMessages.map((message, index) => (
                    <VoiceMessagePopup
                        key={index}
                        message={message}
                        onPlay={() => playVoiceMessage(index)}
                        isPlaying={currentPlayingMessage === index}
                        onStop={stopVoiceMessage}
                    />
                ))}
            </Box>
        </Paper>
    );
};

export default AdminReady;
