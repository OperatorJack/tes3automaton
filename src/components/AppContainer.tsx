import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import {
    AppBar,
    AppBarProps,
    Box,
    CSSObject,
    CssBaseline,
    Divider,
    Drawer,
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
} from "@mui/material";

import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RespecView from "./views/RespecView";
import SettingsView from "./views/SettingsView";
import { zoomPercentSelector } from "../atoms";

interface View {
    text: string;
    icon: React.ReactElement;
    view: React.ReactElement;
}

const views: View[] = [
    {
        text: "Asset Respec",
        icon: <SettingsInputComponentIcon />,
        view: <RespecView />,
    },
    {
        text: "Settings",
        icon: <SettingsIcon />,
        view: <SettingsView />,
    },
];

export default function AppContainer() {
    const zoom = useRecoilValue(zoomPercentSelector);

    const [viewIndex, setViewIndex] = useState(0);
    const [open, setOpen] = useState(true);

    const toggleOpen = () => setOpen(!open);

    return (
        <Box sx={{ display: "flex", zoom: zoom }}>
            <CssBaseline />
            <MiniAppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleOpen}
                        edge="start"
                        sx={{
                            marginRight: 4,
                        }}
                    >
                        {!open && <MenuIcon />}
                        {open && <MenuOpenIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {views[viewIndex].text}
                    </Typography>
                </Toolbar>
            </MiniAppBar>
            <MiniDrawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div">
                        TES3 Automaton
                    </Typography>
                </DrawerHeader>
                <Divider />
                <List>
                    {views.map((view, index) => (
                        <ListItem
                            key={view.text}
                            disablePadding
                            selected={index == viewIndex}
                        >
                            <ListItemButton onClick={() => setViewIndex(index)}>
                                <ListItemIcon>{view.icon}</ListItemIcon>
                                <ListItemText primary={view.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </MiniDrawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, pt: 8 }}
            >
                {views[viewIndex].view}
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
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface MiniAppBarProps extends AppBarProps {
    open?: boolean;
}

const MiniAppBar = styled(AppBar, {
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

const MiniDrawer = styled(Drawer, {
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
