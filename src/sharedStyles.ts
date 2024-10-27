import { brown } from "@mui/material/colors"

export const stallStyles = {
    cardHeaderFontFamily: "lexend-tera",
    backgroundColor:       "#333d29",
    buttonBackgroundColor: "#a68a64",
    button: {
        fontSize: 30,
        fontWeight: "bold",
    },

    cardBackgroundColor:   "#c2c5aa"
}

export const commonStyles = {
    colors: {
        // Browns for wood and parchment-like backgrounds
        veryDarkBrown: "#582f0e",
        darkBrown: "#7f4f24",
        brown: "#936639",
        lightBrown: "#a68a64",
        veryLightBrown: "#b6ad90",
        
        // Greens for nature-inspired accents
        veryDarkGreen: "#333d29",
        darkGreen: "#414933",
        green: "#656d4a",
        lightGreen: "#a4ac86",
        veryLightGreen: "#c2c5aa",
        
        // Accents for interactive elements
        accent: "#9e2b25",          // Deep red accent for buttons, active elements
        darkAccent: "#7c1f1a",      // Darker shade for hover states on accents
        subtleAccent: "#d9a053",    // Golden-like hue for softer highlights
        
        // Neutrals for text and shadows
        darkText: "#2c2c2c",        // Dark gray for main text
        subtleText: "#5a5a5a",      // Medium gray for secondary text
        inactive: "#a1a1a1",        // Gray for inactive buttons or placeholders
        
        // Backgrounds for UI depth
        parchment: "#f5deb3",       // Light cream for parchment effects
        shadow: "rgba(0, 0, 0, 0.4)", // Dark shadow for depth effects
        lightShadow: "rgba(0, 0, 0, 0.2)", // Light shadow for soft UI accents
    }
};