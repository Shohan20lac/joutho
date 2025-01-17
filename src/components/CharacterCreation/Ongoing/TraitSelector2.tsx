import { Box, Typography } from "@mui/material";
import { io } from "socket.io-client";
import { EventConstant } from "@/const/event.const";
import { AudibleEvent, AvatarState, playAlertSound, SelectionState, Visitor } from "@/utils";
import Image from "next/image";
import { commonStyles } from "@/sharedStyles";

interface TraitSelector2Props {
  visitor: Visitor;
  setVisitor: (visitor: Visitor) => void;
  socket: ReturnType<typeof io> | null;
}

// Configuration map for traits
const TRAIT_CONFIG = {
  animal: {
    validValues: ["hawk", "owl", "dolphin"],
    imagePath: "/images/animal",
    displayName: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  item: {
    validValues: ["shield", "key", "compass"],
    imagePath: "/images/item",
    displayName: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  element: {
    validValues: ["fire", "water", "earth", "air"],
    imagePath: "/images/element",
    displayName: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  power: {
    validValues: ["gear", "resistance", "heart"],
    imagePath: "/images/power",
    displayName: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
  },
};

const TraitSelector2: React.FC<TraitSelector2Props> = ({visitor, setVisitor, socket}) => {
  const { avatarState } = visitor;

  const handleTraitClick = (trait: keyof typeof TRAIT_CONFIG, value: string) => {
    if (!TRAIT_CONFIG[trait]?.validValues.includes(value)) {
      console.error(`Invalid ${trait} value: ${value}`);
      return;
    }

    // Update the avatar state to REQUESTED
    const updatedAvatarState = {
      ...avatarState,
      [trait]: {
        value,
        selectionState: SelectionState.REQUESTED,
      },
    };

    setVisitor({
      ...visitor,
      avatarState: updatedAvatarState,
    });

    // Emit the NOTIFY event
    socket?.emit(EventConstant.Stall.Visitor.SELECTED_TRAIT.NOTIFY, {
      visitorId: visitor.id,
      visitorName: visitor.name,
      selectedTrait: trait,
      selectedTraitValue: value,
    });
  };

  // Listen for ACK signal from the socket
  socket?.on(EventConstant.Stall.Admin.APPROVED_VISITOR_TRAIT.ACKNOWLEDGE, ({ approvedTrait }) => {
    const updatedAvatarState = {
      ...avatarState,
      [approvedTrait as keyof AvatarState]: {
        ...avatarState[approvedTrait as keyof AvatarState],
        selectionState: SelectionState.APPROVED,
      },
    };

    // Move to the next idle trait
    setVisitor({
      ...visitor,
      avatarState: updatedAvatarState,
    });
  });

  const renderTraitOptions = () => {
    const firstIdleTrait = Object.keys(TRAIT_CONFIG).find(
      (trait) =>
        avatarState[trait as keyof AvatarState]?.selectionState === SelectionState.IDLE
    ) as keyof typeof TRAIT_CONFIG;

    const firstRequestedTrait = Object.keys(TRAIT_CONFIG).find(
      (trait) =>
        avatarState[trait as keyof AvatarState]?.selectionState === SelectionState.REQUESTED
    ) as keyof typeof TRAIT_CONFIG;

    // Highlight the card if in REQUESTED state
    const currentTrait = firstRequestedTrait || firstIdleTrait;

    if (!currentTrait) {
      // All traits are approved
      return (
        <Typography color="white" align="center" sx={{ textShadow: "0 0 4px black" }}>
          Character creation complete!
        </Typography>
      );
    }

    const { validValues, imagePath, displayName } = TRAIT_CONFIG[currentTrait];

    console.log ('about to render TraitSelector2 with visitor:', avatarState)

    return validValues.map((value) => {
      const isSelected =
        avatarState[currentTrait]?.value === value &&
        avatarState[currentTrait]?.selectionState === SelectionState.REQUESTED;

      const resolvedImagePath = `${imagePath}/${value}.jpg`

      console.log ('resolvedImagePath:', resolvedImagePath)

      return (
        <Box
          key={value}
          sx={{
            display: "inline-block",
            margin: "0.5rem",
            cursor: "pointer",
            backgroundColor: isSelected
              ? commonStyles.colors.darkBrown
              : commonStyles.colors.lightBrown,
            borderRadius: "8px",
            paddingTop: "0.4rem",
          }}
          onClick={() => {
            playAlertSound (AudibleEvent.REQUEST)
            handleTraitClick (currentTrait, value)}
          }
        >
          <Image
            src={resolvedImagePath}
            alt={value}
            width={100}
            height={100}
            style={{
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Typography
            align="center"
            color="white"
            sx={{
              textShadow: "0 0 2px black",
            }}
          >
            {displayName(value)}
          </Typography>
        </Box>
      );
    });
  };

  return <>{renderTraitOptions()}</>;
};


export default TraitSelector2;
