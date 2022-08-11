import React, { useState } from "react";

import {
    Box,
    CSSObject,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    styled,
    useTheme,
} from "@mui/material";

import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

import { useRecoilValue } from "recoil";

import RespecView from "./views/RespecView";
import SettingsView from "./views/SettingsView";
import { zoomPercentSelector } from "../atoms";

interface View {
    text: string;
    icon: React.ReactElement;
    view: React.ReactElement;
}

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
    const zoom = useRecoilValue(zoomPercentSelector);
    const theme = useTheme();

    const [groupIndex, setGroupIndex] = useState(0);
    const [index, setIndex] = useState(0);

    const [open, setOpen] = React.useState(false);

    const onOpened = () => setOpen(true);
    const onClosed = () => setOpen(false);

    return (
        <Box sx={{ display: "flex", zoom: zoom }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onOpened}
                        edge="start"
                        sx={{
                            marginRight: 4,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {viewGroups[groupIndex][index].text}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div">
                        TES3 Automaton
                    </Typography>
                    <IconButton onClick={onClosed}>
                        <MenuIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {viewGroups.map((viewGroup: View[], mapGroupIndex) => (
                        <>
                            {viewGroup.map((view, mapIndex) => {
                                return (
                                    <ListItem
                                        key={view.text}
                                        disablePadding
                                        selected={
                                            mapGroupIndex == groupIndex &&
                                            mapIndex == index
                                        }
                                    >
                                        <ListItemButton
                                            onClick={() => {
                                                setGroupIndex(mapGroupIndex);
                                                setIndex(mapIndex);
                                            }}
                                        >
                                            <ListItemIcon>
                                                {view.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={view.text} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </>
                    ))}
                </List>
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

/**
 *  "MiniDrawer" Styling
 *
 *  see: https://mui.com/material-ui/react-drawer/#MiniDrawer.tsx
 */

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface MiniAppBarProps extends AppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<MiniAppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));
