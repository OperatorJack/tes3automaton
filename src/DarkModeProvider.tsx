import {
    createTheme,
    ThemeProvider,
    PaletteMode,
    CssBaseline,
} from "@mui/material";
import React from "react";
import { ColorModeContext } from "./contexts/ColorModeContext";

function DarkModeProvider({ children }: { children?: React.ReactNode }) {
    const [mode, setMode] = React.useState("dark" as PaletteMode);
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default DarkModeProvider;
