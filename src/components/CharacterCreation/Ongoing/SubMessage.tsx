import { SelectionState, Animal, AvatarState, Element, Item, Power } from "@/utils";
import { Typography } from "@mui/material";

export interface PromptMessageProps {
  avatarState: AvatarState;
}

const getAnimalMessage = (animal: Animal) => {
  switch (animal) {
    case Animal.HAWK: return "With sharp eyes and swift wings, the hawk empowers you to strike with precision.";
    case Animal.OWL: return "Guided by wisdom and a keen gaze, the owl watches over your journey.";
    case Animal.DOLPHIN: return "Graceful and playful, the dolphin connects you with the depths of intuition.";
    default:
      return null;
  }
};

const getElementMessage = (element: Element) => {
  switch (element) {
    case Element.FIRE: return "Burning with passion and power, fire ignites your will to overcome any obstacle.";
    case Element.WATER: return "Flowing with calm and persistence, water adapts and conquers all in its path.";
    case Element.AIR: return "Light and free, the air carries you forward with boundless possibilities.";
    case Element.EARTH: return "Steady and resilient, the earth grounds you in strength and resolve.";
    default:
      return null;
  }
};

const getItemMessage = (item: Item) => {
  switch (item) {
    case Item.SHIELD: return "The shield fortifies your spirit, protecting you from the challenges ahead.";
    case Item.KEY: return "The key unlocks paths and reveals mysteries hidden from the ordinary eye.";
    case Item.COMPASS: return "The compass guides your steps, ensuring you never stray from your destined path.";
    default:
      return null;
  }
};

const getPowerMessage = (item: Item, power: Power) => {
  if (item === Item.SHIELD) {
    return power === Power.GEAR
      ? "With the shield empowered by gear, you stand ready to defend the weak and restore balance."
      : power === Power.RESISTANCE
      ? "With the shield imbued with resistance, you deflect harm and withstand any attack."
      : "The shield blessed with heart transforms protection into a symbol of hope and unity.";
  }

  if (item === Item.KEY) {
    return power === Power.GEAR
      ? "The key augmented by gear unlocks the means to restore order and repair what is broken."
      : power === Power.RESISTANCE
      ? "The key forged with resistance withstands barriers and unlocks paths to freedom."
      : "The key enriched with heart opens doors to connections and empowers bonds of love.";
  }

  if (item === Item.COMPASS) {
    return power === Power.GEAR
      ? "The compass aligned with gear navigates to solutions and unveils the mechanics of success."
      : power === Power.RESISTANCE
      ? "The compass imbued with resistance guides you through storms and steadfastly points to your goal."
      : "The compass infused with heart ensures your journey fosters unity and fulfills dreams.";
  }

  return null;
};

const SubMessage = ({ avatarState }: PromptMessageProps) => {
  const { animal, element, item, power } = avatarState;
  return (
    <Typography
      sx={{
        textAlign: "center",
        color: "black",
      }}
    >
        {
            animal.selectionState  === SelectionState.REQUESTED ? getAnimalMessage  (animal.value as Animal) : 
            element.selectionState === SelectionState.REQUESTED ? getElementMessage (element.value as Element) : 
            item.selectionState    === SelectionState.REQUESTED ? getItemMessage    (item.value as Item) : 
            power.selectionState   === SelectionState.REQUESTED ? getPowerMessage   (item.value as Item, power.value as Power) 
            : "(click on a card to continue)"
        }
    </Typography>
  );
};

export default SubMessage;
