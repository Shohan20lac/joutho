import { SelectionState } from "./selection.utils";

export enum VisitorState {
    ENTER_NAME = "ENTER_NAME",
    ENTER_PASSWORD = "ENTER_PASSWORD",
    CHARACTER_CREATION_PROMPTED = "CHARACTER_CREATION_PROMPTED",
    CHARACTER_CREATION_ONGOING = "CHARACTER_CREATION_ONGOING",
    CHARACTER_CREATION_SUCCESS = "CHARACTER_CREATION_SUCCESS",
}

export interface AvatarState {
    animal:  SelectionState
    element: SelectionState
    item:    SelectionState
    power:   SelectionState
}

export interface Visitor {
    id: string;
    name: string;
    visitorState: VisitorState;
    avatarState: AvatarState
}