export enum TalkingPillowState {
    WILL_TALK = "willTalk",
    IS_TALKING = "isTalking",
    IS_LISTENING = "isListening",
}

export interface TalkingPillowStatesMap {
    adminPillowState: TalkingPillowState;
    visitorPillowState: TalkingPillowState;
}

export interface AudioMessage {
    sender: TalkingPillowState;
    audio: Blob;
}

export enum TalkingPillowRole {
    ADMIN = "admin",
    VISITOR = "visitor",
}