import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import React from "react";

interface TopNavBarProps {
    selectedTab: "dashboard" | "lobby" | null
    onSelectTab: Dispatch<SetStateAction<"dashboard" | "lobby" | null>>
}

const TopNav = ({selectedTab, onSelectTab}: TopNavBarProps) =>
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            padding: 2
        }}
        >
        <Button
            onClick={() => onSelectTab("dashboard")}
            sx={{
                fontWeight: selectedTab === "dashboard" ? "bold" : "normal",
                color: selectedTab === "dashboard" ? "green" : "black"
            }}
        >
            ADM
        </Button>
        <Button
            onClick={() => onSelectTab("lobby")}
            color="inherit"
            sx={{
                fontWeight: selectedTab === "lobby" ? "bold" : "normal",
                color: selectedTab === "lobby" ? "green" : "black"
            }}
        >
            MNTR
        </Button>
    </Box>

export default TopNav;