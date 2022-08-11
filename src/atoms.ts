import { PaletteMode } from "@mui/material";
import { atom, selector } from "recoil";

export const colorModeState = atom({
    key: "ColorModeState",
    default: "dark" as PaletteMode,
});
export const zoomState = atom({
    key: "ZoomState",
    default: 75,
});
export const zoomPercentSelector = selector({
    key: "ZoomPercentSelector",
    get: ({ get }) => {
        const zoom = get(zoomState);
        return `${zoom}%`;
    },
});

export const workingDirectoryState = atom({
    key: "WorkingDirectoryState",
    default: "",
});
