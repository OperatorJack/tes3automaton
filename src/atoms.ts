import { PaletteMode } from "@mui/material";
import { atom } from "recoil";

export const colorModeState = atom({
    key: "ColorModeState",
    default: "dark" as PaletteMode,
});
export const workingDirectoryState = atom({
    key: "WorkingDirectoryState",
    default: "",
});
