import { PaletteMode, useTheme } from "@mui/material";
import { FormControlLabel, FormGroup, IconButton } from "@mui/material";
import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSetRecoilState } from "recoil";
import { colorModeState } from "../../../atoms";

export function DarkModeToggleButton() {
    const theme = useTheme();
    const setMode = useSetRecoilState(colorModeState);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const onClick = function () {
        console.log("Toggling color mode. %s", Date.now());
        colorMode.toggleColorMode();
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IconButton color="inherit" onClick={onClick}>
                        {theme.palette.mode === "dark" ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                }
                label={
                    theme.palette.mode === "dark"
                        ? "Enable Light Mode"
                        : "Enable Dark Mode"
                }
            />
        </FormGroup>
    );
}
