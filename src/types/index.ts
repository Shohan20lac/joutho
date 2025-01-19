export enum RequestCharacterCreationState {
    PROMPT_START = "promptStart",
    WAITING_FOR_ADMIN = "waitingForAdmin",
    ADMIN_READY = "adminReady",
}

export enum TalkingPillowHolderState {
    WILL_TALK = "willTalk",
    IS_TALKING = "isTalking",
    IS_LISTENING = "isListening",
}

export interface TalkingPillowState {
    admin:   TalkingPillowHolderState
    visitor: TalkingPillowHolderState
}

export interface AudioMessage {
    sender: TalkingPillowRole;
    audio: Blob;
}

export enum TalkingPillowRole {
    ADMIN = "admin",
    VISITOR = "visitor",
}


// common types
export interface Stall {
    id: string;
    name: string;
    operationStatus: StallOperationStatus
}

export enum StallOperationStatus {
    OPEN = "open",
    CLOSED = "closed",
}

// admin types
export enum AdminPageScreen {
    DASHBOARD = "dashboard",
    LOBBY = "lobby",
}