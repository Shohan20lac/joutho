import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PromptMessage from "./PromptMessage"
import TraitSelector2 from "./TraitSelector2"
import SubMessage from "./SubMessage"
import { io } from "socket.io-client"
import { AudibleEvent, playAlertSound, SelectionState, Visitor } from "@/utils"
import { commonStyles } from "@/sharedStyles"
import { Box } from "@mui/material"
import { EventConstant } from "@/const/event.const"

export enum SelectableTrait {
    ANMIAL = "ANIMAL",
    ELEMENT = "ELEMENT",
    ITEM = "ITEM",
    POWER = "POWER",
}

export const characterCreationStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", // Align to top
      width: "100vw",
      height: "100vh",
      padding: "0.5rem", // Reduced padding for smaller screens
      backgroundColor: commonStyles.colors.lightBrown,
      overflowY: "auto", // Add scroll support for small screens
    },
    parchmentCard: {
      padding: "1rem", // Adjust padding for smaller screens
      backgroundColor: commonStyles.colors.parchment,
      borderRadius: "12px",
      boxShadow: `0px 4px 8px ${commonStyles.colors.shadow}`,
      maxWidth: "90%", // Use percentage-based width for responsiveness
      textAlign: "center",
      marginBottom: "1rem",
    },
};


export enum CharacterCreationState {
    ANIMAL = "ANIMAL",
    ELEMENT = "ELEMENT",
    ITEM = "ITEM",
    POWER = "POWER",
    DONE = "DONE",
}
interface CharacterCreationProps {
    socket: ReturnType<typeof io> | null;
    visitor: Visitor
    setVisitor: Dispatch<SetStateAction<Visitor>>
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({visitor, setVisitor, socket, }) => {

    useEffect (() => {
        socket?.on (
            EventConstant.Stall.Visitor.SELECTED_TRAIT.ACKNOWLEDGE,
            ({visitorId, selectedTrait, selectedTraitValue}) => {
                console.log (`visitor ${visitorId} selected trait ${selectedTrait} value ${selectedTraitValue}`)
            }
        )

        socket?.on (
            EventConstant.Stall.Admin.APPROVED_VISITOR_TRAIT.ACKNOWLEDGE,
            ({visitorId, selectedTrait, selectedTraitValue}) => {
                console.log (`admin approved visitor ${visitorId} trait ${selectedTrait} value ${selectedTraitValue}`)
                playAlertSound (AudibleEvent.APPROVE)}
        )
    },[])

    return (
      <Box sx={characterCreationStyles.container}>
        <Box sx={{
            ...characterCreationStyles.parchmentCard,
            marginTop: '10px'
        }}>
          <PromptMessage avatarState={visitor.avatarState} />
        </Box>
  
        <Box sx={characterCreationStyles.parchmentCard}>
            <TraitSelector2 
                visitor={visitor} 
                setVisitor={setVisitor} 
                socket={socket}
            />
        </Box>

        <Box sx={characterCreationStyles.parchmentCard}>
            <SubMessage avatarState={visitor.avatarState}/>
        </Box>
      </Box>
    );
  };
  

export default CharacterCreation