import { Dispatch, SetStateAction, useState } from "react"
import Selector from "./TraitSelector"
import { AvatarState } from "@/pages/welcome"
import TraitSelector from "./TraitSelector"

export enum SelectableTrait {
    ANMIAL = "ANIMAL",
    ELEMENT = "ELEMENT",
    ITEM = "ITEM",
    POWER = "POWER",
}

interface CharacterCreationProps {
    avatarState: AvatarState
    setAvatarState: Dispatch<SetStateAction<AvatarState>>
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({avatarState, setAvatarState}) => {
    const [traitBeingSelected, setTraitBeingSelected] = useState<SelectableTrait> (SelectableTrait.ANMIAL)

    return (
        <TraitSelector
            traitBeingSelected = {traitBeingSelected}
            setTraitBeingSelected = {setTraitBeingSelected}
            avatarState = {avatarState}
            setAvatarState = {setAvatarState}
        />
    )
}

export default CharacterCreation