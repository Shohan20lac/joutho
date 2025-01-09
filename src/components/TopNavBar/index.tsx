import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import React from "react";

interface TopNavBarProps {
    currentView: "selector" | "admin" | "monitor";
    setCurrentView: Dispatch<SetStateAction<"selector" | "admin" | "monitor">>
}

const TopNav = ({currentView, setCurrentView}: TopNavBarProps) =>
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2,
            backgroundColor: "#333",
            color: "#fff",
            visibility: currentView === "selector" ? "hidden" : "visible", // Hide in selector mode
        }}
        >
        <Button
            onClick={() => setCurrentView("admin")}
            color="inherit"
            sx={{
                fontWeight: currentView === "admin" ? "bold" : "normal", // Highlight active view
            }}
        >
            ADM
        </Button>
        <Button
            onClick={() => setCurrentView("monitor")}
            color="inherit"
            sx={{
                fontWeight: currentView === "monitor" ? "bold" : "normal", // Highlight active view
            }}
        >
            MNTR
        </Button>
    </Box>

export default TopNav;