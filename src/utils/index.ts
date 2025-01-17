export enum UserStatus {
    ACTIVE="active",
    INACTIVE="inactive"
}


type AdminId = string;
export interface StallAdmin {
  id: string;
  name: string;
}
export interface AdminsMap {
    [key: AdminId]: StallAdmin
}

export enum AudibleEvent {
  APPROVE = "approve",
  DONE = "done",
  REQUEST = "request",
  START = "start",
}
  
export const playAlertSound = (audibleEvent: AudibleEvent) => {
    const audio = new Audio(`/sounds/${audibleEvent}.wav`); // Add an alert sound file to your public folder
    audio.play().catch((err) => console.error("Failed to play sound:", err));
}

export enum SelectionState {
  IDLE = "IDLE",
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
}


export enum VisitorState {
  ENTER_NAME = "ENTER_NAME",
  ENTER_PASSWORD = "ENTER_PASSWORD",
  CHARACTER_CREATION_PROMPTED = "CHARACTER_CREATION_PROMPTED",
  CHARACTER_CREATION_ONGOING = "CHARACTER_CREATION_ONGOING",
  CHARACTER_CREATION_SUCCESS = "CHARACTER_CREATION_SUCCESS",
}

type AvatarTrait = Animal | Element | Item | Power | null
export interface TraitState {
  value: AvatarTrait
  selectionState: SelectionState;
}

export interface AvatarState {
  animal:  TraitState
  element: TraitState
  item:    TraitState
  power:   TraitState
}

export enum Animal {
  HAWK = "hawk",
  OWL = "owl",
  DOLPHIN = "dolphin",
}

export enum Item {
  SHIELD = "shield",
  KEY= "key",
  COMPASS= "compass",
}

export enum Element {
  FIRE = "fire",
  WATER = "water",
  EARTH = "earth",
  AIR = "air",
}

export enum Power {
  GEAR = "gear",
  HEART = "heart",
  RESISTANCE = "resistance",
}

export interface Visitor {
  id: string;
  name: string;
  visitorState: VisitorState;
  avatarState: AvatarState
}

export const generateNewVisitor = (): Visitor => {
    const randomEnumValue = <T extends Record<string, string | number>>(enumObject: T): T[keyof T] => {
      const values = Object.values(enumObject) as T[keyof T][];
      return values[Math.floor(Math.random() * values.length)];
    };
  
    const randomSelectionState = (): SelectionState => {
      const states = Object.values(SelectionState) as SelectionState[];
      return states[Math.floor(Math.random() * states.length)];
    };
  
    return {
      id: Math.random().toString(),
      name: "Visitor " + Math.round(Math.random() * 1000),
      visitorState: VisitorState.CHARACTER_CREATION_PROMPTED,
      avatarState: {
        animal: {
          value: randomEnumValue(Animal),
          selectionState: randomSelectionState(),
        },
        element: {
          value: randomEnumValue(Element),
          selectionState: randomSelectionState(),
        },
        item: {
          value: randomEnumValue(Item),
          selectionState: randomSelectionState(),
        },
        power: {
          value: randomEnumValue(Power),
          selectionState: randomSelectionState(),
        }
      }
    }
  }
  

type VisitorId = string;
export interface VisitorsMap {
    [key: VisitorId]: Visitor
}


export const advanceAvatarState = (avatarState: AvatarState): AvatarState => {
  
  const traits = ["animal", "element", "item", "power"] as const;

  for (const trait of traits) {
    const currentState = avatarState[trait].selectionState;

    if (currentState === SelectionState.IDLE) {
      avatarState[trait].selectionState = SelectionState.REQUESTED;
    }

    if (currentState === SelectionState.REQUESTED) {
      avatarState[trait].selectionState = SelectionState.APPROVED;
    }

    // If currentState is APPROVED, move to the next trait
  }

  // If all traits are already APPROVED, return the visitor as is
  return avatarState
}

export interface StallActivity {
  admins:   AdminsMap
  visitors: VisitorsMap
}

export const getNearestApprovableTrait = (avatarState: AvatarState) => {
  console.log ('about to get nearest approvable trait for avatarState:', avatarState)
  return (
    Object.keys(avatarState).find (
      (trait) =>
        avatarState[trait as keyof AvatarState]?.selectionState === SelectionState.REQUESTED
    ) as keyof typeof avatarState
  )
}

export const recordVoiceMessage = (callback: (audioBlob: Blob) => void) => {
  const audioBlob = new Blob(["audio data"])
  callback(audioBlob)
}