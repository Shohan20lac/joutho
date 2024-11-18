import { Animal, Element, Item, Power } from "@/const/avatar.const"

export const TraitConstants = {
    Animal: {
        initialPrompt: "Are you a Hawk, Owl or Dolphin?",
        options: {
            HAWK: 
                {
                    name: Animal.HAWK,
                    promptText: "Are you a Hawk?"
                },
            OWL: 
                {
                    name: Animal.OWL,
                    promptText: "Are you an Owl?"
                },
            DOLPHIN: 
                {
                    name: Animal.DOLPHIN,
                    promptText: "Are you a Dolphin?"
                }
        }
    },
    Element: {
        initialPrompt: "Are you Fire, Water, Air or Earth?",
        options: {
            FIRE: 
                {
                    name: Element.FIRE,
                    promptText: "Are you Fire?"
                },
            WATER: 
                {
                    name: Element.WATER,
                    promptText: "Are you Water?"
                },
            AIR: 
                {
                    name: Element.AIR,
                    promptText: "Are you Air?"
                },
            EARTH: 
                {
                    name: Element.EARTH,
                    promptText: "Are you Earth?"
                }
        }
    },
    ITEM: {
        initialPrompt: "Choose a magic item to save the world.",
        options: {
            COMPASS: {
                name: Item.COMPASS,
                promptText: "Can a magic compass save the world?"
            },
            SHIELD: {
                name: Item.SHIELD,
                promptText: "Can a magic shield save the world?"
            },
            KEY: {
                name: Item.KEY,
                promptText: "Can a magic key save the world?"
            },
        }
    },
    POWER: {
        promptText: "Choose a magical power to save the world.",
        options: [Power.GEAR, Power.HEALTH, Power.HEART, Power.RESISTANCE, Power.WEALTH],
    },
}