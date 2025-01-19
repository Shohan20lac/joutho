import { RequestCharacterCreationState, TalkingPillowHolderState, TalkingPillowState } from "@/types";

const {PROMPT_START, WAITING_FOR_ADMIN, ADMIN_READY} = RequestCharacterCreationState
const {WILL_TALK, IS_TALKING, IS_LISTENING} = TalkingPillowHolderState

export const RequestCharacterCreationConstant = {
    Modal: {
        [PROMPT_START]: {
            Header:    "Let's get you a password",
            SubHeader: (_: any) => "Your password is your avatar.",
            Body:      "Are you ready to make your avatar? (5 mins)",
            Subtitle:  null,
        },
        [WAITING_FOR_ADMIN]: {
            Header:    "Waiting for Admin",
            SubHeader: (_: any) => "An admin will be with you shortly.",
            Body: null,
            Subtitle:  null,
        },
        [ADMIN_READY]: {
            Header:    "Avatar Creation",
            SubHeader: (adminName: string) => `Admin ${adminName} is here for you.`,
            Body: null,
            Subtitle: {
                [`admin: ${WILL_TALK} visitor: ${IS_LISTENING}`]:  (adminName: string) => `${adminName} has the talking pillow.`,
                [`admin: ${IS_TALKING} visitor: ${IS_LISTENING}`]: (adminName: string) => `${adminName} is talking...`,
                [`admin: ${IS_LISTENING} visitor: ${WILL_TALK}`]:  (adminName: string) => `You have the talking pillow, and ${adminName} is listening.`,
                [`admin: ${IS_LISTENING} visitor: ${IS_TALKING}`]: (adminName: string) => `You are talking.`,
                
                // Illegal cases
                [`admin: ${WILL_TALK} visitor: ${IS_TALKING}`]:      (adminName: string) => `Admin ${adminName} has the talking pillow, but you are already talking.`,
                [`admin: ${IS_TALKING} visitor: ${IS_TALKING}`]:     (adminName: string) => `Both of you are talking.`,
                [`admin: ${WILL_TALK} visitor: ${WILL_TALK}`]:       (adminName: string) => `Both of you have the talking pillow.`,
                [`admin: ${IS_TALKING} visitor: ${WILL_TALK}`]:      (adminName: string) => `Admin ${adminName} is talking, but you have the talking pillow.`,
                [`admin: ${IS_LISTENING} visitor: ${IS_LISTENING}`]: (adminName: string) => `Both of you are listening.`,
            },
        },
    },
}