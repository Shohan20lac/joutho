import { useState } from "react"
import { Box, Typography } from "@mui/material"
import { keyframes } from "@emotion/react"
import { commonStyles } from "@/sharedStyles"
import { Animal } from "@/const/avatar.const"
import { Element } from "@/const/avatar.const"
import { Item } from "@/const/avatar.const"
import { Power } from "@/const/avatar.const"
import WelcomeCard from "@/components/Welcome/WelcomeCard"
// import "../app/globals.css"
import EnterPassword from "@/components/Welcome/EnterPassword"
import AnimalSelector from "@/components/CharacterCreation/animalSelector"
import RequestCharacterCreation from "@/components/CharacterCreation/requestCharacterCreation"

const breathingEffect = keyframes`
  0% { background-color: ${commonStyles.colors.lightBrown}; }
  50% { background-color: ${commonStyles.colors.darkGreen}; }
  100% { background-color: ${commonStyles.colors.lightBrown}; }
`;

export enum VisitorState {
    ENTER_NAME = "ENTER_NAME",
    ENTER_PASSWORD = "ENTER_PASSWORD",
    CHARACTER_CREATION_REQUESTED = "CHARACTER_CREATION_REQUESTED",
    CHARACTER_CREATION_ONGOING = "CHARACTER_CREATION_ONGOING",
    CHARACTER_CREATION_SUCCESS = "CHARACTER_CREATION_SUCCESS"
}

export interface AvatarState {
    name:    string
    animal:  Animal
    element: Element
    item:    Item
    power:   Power
}


export default function Welcome () {
    const [visitorState, setVisitorState] = useState <VisitorState> (VisitorState.ENTER_NAME)

    const [avatarState, setAvatarState] = useState<AvatarState> ({
        name:    "",
        animal:  Animal.NONE,
        element: Element.NONE,
        item:    Item.NONE,
        power:   Power.NONE
    })

    return (
        
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                backgroundColor: 
                    visitorState === VisitorState.ENTER_NAME ? 
                        commonStyles.colors.darkBrown :
                    visitorState === VisitorState.ENTER_PASSWORD ?
                        commonStyles.colors.lightBrown
                    : commonStyles.colors.lightBrown,
            }}
        >
        {
            visitorState === VisitorState.ENTER_NAME ? 
                <WelcomeCard 
                    avatarState     = {avatarState} 
                    setAvatarState  = {setAvatarState} 
                    setVisitorState = {setVisitorState}
                /> : 
                
            visitorState === VisitorState.ENTER_PASSWORD ?
                <EnterPassword
                    avatarState     = {avatarState} 
                    setAvatarState  = {setAvatarState} 
                    setVisitorState = {setVisitorState}
                /> :

            visitorState === VisitorState.CHARACTER_CREATION_REQUESTED ?
                <RequestCharacterCreation
                    visitorName={avatarState.name}
                    setVisitorState={setVisitorState}
                /> :

            visitorState === VisitorState.CHARACTER_CREATION_ONGOING ?
                <AnimalSelector avatarState={avatarState} setAvatarState={setAvatarState}/> :

            visitorState === VisitorState.CHARACTER_CREATION_SUCCESS ?
                <Typography>
                    {`welcome to the joutho network, ${avatarState.name}!`}
                </Typography> :
                
            <></>
        }
        </Box>
    );
}