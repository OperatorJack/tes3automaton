import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { zoomState } from "../../../atoms";

function valuetext(value: string): string {
    return `${value}%`;
}

export function ZoomSelector() {
    const [zoom, setZoom] = useRecoilState(zoomState);

    const handleChange = (event: any) => {
        setZoom(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="zoom-select-label">Zoom</InputLabel>
            <Select
                labelId="zoom-select-label"
                id="zoom-select"
                value={zoom}
                label="Zoom"
                onChange={handleChange}
            >
                <MenuItem value={75}>75%</MenuItem>
                <MenuItem value={100}>100%</MenuItem>
                <MenuItem value={125}>125%</MenuItem>
            </Select>
        </FormControl>
    );
}
