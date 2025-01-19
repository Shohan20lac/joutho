import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { AdminPageScreen } from "../AdminPageUI";

interface TopNavBarProps {
    selectedTab: "dashboard" | "lobby" | null
    onSelectTab: Dispatch <SetStateAction<AdminPageScreen>>
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
            onClick={() => onSelectTab(AdminPageScreen.DASHBOARD)}
            sx={{
                fontWeight: selectedTab === "dashboard" ? "bold" : "normal",
                color: selectedTab === "dashboard" ? "green" : "black"
            }}
        >
            DSHBRD
        </Button>
        <Button
            onClick={() => onSelectTab(AdminPageScreen.LOBBY)}
            color="inherit"
            sx={{
                fontWeight: selectedTab === "lobby" ? "bold" : "normal",
                color: selectedTab === "lobby" ? "green" : "black"
            }}
        >
            LBY
        </Button>
    </Box>

export default TopNav;