import { Paper, Typography, Button, Box, Switch, Modal } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { VisitorState } from "@/pages/welcome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserStatus } from "@/utils";
import Bubble from "./Bubble";
import { useRouter } from "next/router";

interface RequestCharacterCreationModalProps {
    visitorName: string
    setVisitorState: Dispatch<SetStateAction<VisitorState>>
    open: boolean
    onClose: () => void
}

export enum RequestCharacterCreationState {
    PROMPT_START= "promptStart",
    WAITING_FOR_ADMIN= "waitingForAdmin",
    ADMIN_READY="adminReady"
}

export interface AdminState {
    name: string
}

enum TalkingPillowState {
    ADMIN='admin',
    VISITOR='visitor'
}

const RequestCharacterCreationModal = ({ visitorName, setVisitorState, open, onClose, }: RequestCharacterCreationModalProps) => {
    const [requestCharacterCreationState, setRequestCharacterCreationState] = useState<RequestCharacterCreationState>(RequestCharacterCreationState.PROMPT_START)
    const [adminState, setAdminState] = useState <AdminState>({name: 'shohan'})

    const router = useRouter()

    const [showRedButton, setShowRedButton] = useState<boolean> (true)
    const [talkingPillowState, setTalkingPillowState] = useState<TalkingPillowState> (TalkingPillowState.ADMIN)

    const RedButton = () => (
        <Box
            sx={{
                width: 50,
                height: 50,
                backgroundColor: "red",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onClick={() => console.log("red button clicked")}
        />
    )

    useEffect (
        () => {

        },[
            requestCharacterCreationState,
            talkingPillowState
        ]
    )
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={4} sx={{ padding: 4, maxWidth: 500, textAlign: "center", backgroundColor: commonStyles.colors.parchment, margin: '10px' }}>
            {
                requestCharacterCreationState === RequestCharacterCreationState.PROMPT_START
                ?
                    <>
                        <Typography variant="h5"> {`Let's get you a password`} </Typography>
                        <Typography> {`Your avatar is your password.`} </Typography>
                        <Typography> {`Are you ready to make your avatar?`} </Typography>
                        <Box>
                            <Button onClick = {() => setRequestCharacterCreationState(RequestCharacterCreationState.WAITING_FOR_ADMIN)} >
                                Yes
                            </Button>
                            <Button onClick = {() => setVisitorState(VisitorState.ENTER_PASSWORD)}>
                                No
                            </Button>
                        </Box>
                    </>
                :
                    <>
                        <Typography variant="h6"> 
                            {
                                requestCharacterCreationState === RequestCharacterCreationState.WAITING_FOR_ADMIN && 
                                `An admin will be with you shortly.`
                            }
                            {
                                requestCharacterCreationState === RequestCharacterCreationState.ADMIN_READY && 
                                `Admin ${adminState.name} is here for you.`
                            }
                        </Typography>
                        <Box>
                            <Bubble 
                                image  = {null} 
                                label  = {visitorName} 
                                status = {UserStatus.ACTIVE}
                            />
                            <Bubble 
                                image  = {null} 
                                label  = {
                                    requestCharacterCreationState === RequestCharacterCreationState.WAITING_FOR_ADMIN 
                                    ? ''
                                    : adminState.name
                                } 
                                status = {
                                    requestCharacterCreationState === RequestCharacterCreationState.WAITING_FOR_ADMIN 
                                    ? UserStatus.INACTIVE 
                                    : UserStatus.ACTIVE
                                }
                            />
                        </Box>
                        {showRedButton && <RedButton/>}
                        { 
                            requestCharacterCreationState === RequestCharacterCreationState.ADMIN_READY && 
                                <Switch defaultChecked />
                        }
                    </>
            }
        </Paper>
        </Modal>


        
    )
}

export default RequestCharacterCreationModal;

