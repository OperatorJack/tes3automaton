import {
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    Typography,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { open } from "@tauri-apps/api/dialog";
import { useState } from "react";
import { workingDirectoryState } from "../../../atoms";
import { useRecoilState } from "recoil";
import { collectFiles } from "../../../commands";

export function SelectDirectoryButton() {
    const [directory, setDirectory] = useRecoilState(workingDirectoryState);

    const onClick = async function () {
        const selected = await open({ directory: true, multiple: false });
        if (typeof selected != "string") {
            return;
        }

        setDirectory(selected);
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IconButton color="inherit" onClick={onClick}>
                        {<FolderOpenIcon />}
                    </IconButton>
                }
                label={"Select Working Directory"}
            />
            <Typography variant="caption">{`Current: ${
                directory || "None"
            }`}</Typography>
        </FormGroup>
    );
}
