import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { colorModeState } from "./atoms";

function DarkModeProvider({ children }: { children?: React.ReactNode }) {
    const mode = useRecoilValue(colorModeState);

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export default DarkModeProvider;
