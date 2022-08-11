import { FormControlLabel, FormGroup, IconButton } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

async function collectFiles() {
    const selected = await open({ directory: true, multiple: false });
    if (typeof selected != "string") {
        return;
    }

    invoke("collect_files", {
        path: selected,
        extensions: ["nif"],
    })
        .then((files) => console.log(files))
        .catch((e) => console.error(e));
}

export function SelectDirectoryButton() {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IconButton color="inherit" onClick={collectFiles}>
                        {<FolderOpenIcon />}
                    </IconButton>
                }
                label={"Select Folder"}
            />
        </FormGroup>
    );
}
