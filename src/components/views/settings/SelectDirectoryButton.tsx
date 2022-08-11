import {
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { open } from "@tauri-apps/api/dialog";
import { useState } from "react";
import { workingDirectoryState } from "../../../atoms";
import { useRecoilState } from "recoil";
import { collectFiles } from "../../../commands";

export function SelectDirectoryButton() {
    const [directory, setDirectory] = useRecoilState(workingDirectoryState);
    const [files, setFiles] = useState([] as string[]);

    const onClick = async function () {
        const selected = await open({ directory: true, multiple: false });
        if (typeof selected != "string") {
            return;
        }

        setDirectory(selected);

        try {
            const files = await collectFiles(selected, ["nif"]);
            setFiles(files as string[]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control={
                        <IconButton color="inherit" onClick={onClick}>
                            {<FolderOpenIcon />}
                        </IconButton>
                    }
                    label={"Select Folder"}
                />
            </FormGroup>
            <div>
                {directory}
                <Divider />
                {files.length > 0 &&
                    files.map((file: string) => {
                        return <div key={file}>{file}</div>;
                    })}
            </div>
        </>
    );
}
