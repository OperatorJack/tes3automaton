import React, { useState } from "react";

import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import RespecView from "./views/RespecView";
import SettingsView from "./views/SettingsView";
import { zoomPercentSelector } from "../atoms";
import { useRecoilValue } from "recoil";

const drawerWidth = 240;

export type View = {
    text: string;
    icon: React.ReactElement;
    view: React.ReactElement;
};

const viewGroups: View[][] = [
    [
        {
            text: "Asset Respec",
            icon: <SettingsInputComponentIcon />,
            view: <RespecView />,
        },
    ],
    [
        {
            text: "Settings",
            icon: <SettingsIcon />,
            view: <SettingsView />,
        },
    ],
];

export default function AppContainer() {
    const [groupIndex, setGroupIndex] = useState(0);
    const [index, setIndex] = useState(0);
    const zoom = useRecoilValue(zoomPercentSelector);

    return (
        <Box sx={{ display: "flex", zoom: zoom }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {viewGroups[groupIndex][index].text}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem key={"Header"} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={"TES3 Automaton"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                {viewGroups.map(
                    (
                        viewGroup: View[],
                        mapGroupIndex: number
                    ): React.ReactElement => {
                        return (
                            <>
                                <Divider />
                                {viewGroup.map(
                                    (
                                        view: View,
                                        mapIndex: number
                                    ): React.ReactElement => {
                                        return (
                                            <List>
                                                <ListItem
                                                    key={view.text}
                                                    disablePadding
                                                    selected={
                                                        mapGroupIndex ==
                                                            groupIndex &&
                                                        mapIndex == index
                                                    }
                                                >
                                                    <ListItemButton
                                                        onClick={() => {
                                                            setGroupIndex(
                                                                mapGroupIndex
                                                            );
                                                            setIndex(mapIndex);
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            {view.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={view.text}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        );
                                    }
                                )}
                            </>
                        );
                    }
                )}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, pt: 8 }}
            >
                {viewGroups[groupIndex][index].view}
            </Box>
        </Box>
    );
}
