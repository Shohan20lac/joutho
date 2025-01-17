import { TalkingPillowState } from "@/types";
import { Box, Button, Typography } from "@mui/material";

interface TalkingPillowProps {
    role: "admin" | "visitor";
    state: TalkingPillowState;
    onChangeState: (newState: TalkingPillowState) => void;
}

export const TalkingPillow = ({ role, state, onChangeState }: TalkingPillowProps) => {
    const handleChangeState = () => {
        if (state === TalkingPillowState.WILL_TALK) {
            onChangeState(TalkingPillowState.IS_TALKING);
        } else if (state === TalkingPillowState.IS_TALKING) {
            onChangeState(TalkingPillowState.IS_LISTENING);
        } else if (state === TalkingPillowState.IS_LISTENING) {
            onChangeState(TalkingPillowState.WILL_TALK);
        }
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">{role === "admin" ? "Admin" : "Visitor"}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backgroundColor: state === TalkingPillowState.IS_TALKING ? "red" : "gray",
                    }}
                />
                <Button variant="contained" onClick={handleChangeState}>
                    {state === TalkingPillowState.WILL_TALK
                        ? "Start Talking"
                        : state === TalkingPillowState.IS_TALKING
                        ? "Stop Talking"
                        : "Listening..."}
                </Button>
            </Box>
        </Box>
    );
};
