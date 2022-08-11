import {
    Container,
    Paper,
    Box,
    FormGroup,
    TextField,
    Checkbox,
    FormControlLabel,
    Divider,
    Grid,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Collapse,
    IconButton,
    Typography,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { workingDirectoryState } from "../../atoms";

import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

function Row(props: { row: string }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row}
                </TableCell>
                <TableCell align="right">
                    "Modified Texture Path goes here"
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Textures
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Existing Texture Path
                                        </TableCell>
                                        <TableCell>New Texture Path</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            ....original texture path....
                                        </TableCell>
                                        <TableCell>
                                            ....modified texture path....
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function RespecView() {
    const directory = useRecoilValue(workingDirectoryState);
    const [files, setFiles] = useState([] as string[]);

    const collectFiles = async function () {
        const selected = await open({ directory: true, multiple: false });
        if (typeof selected != "string") {
            return;
        }

        try {
            const files = await invoke("collect_files", {
                path: selected,
                extensions: ["nif"],
            });

            console.log(files);
            setFiles(files as string[]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={3} xl={2}>
                <Paper elevation={3}>
                    <Stack m={3}>
                        <FormGroup>
                            <Box p={3}>
                                <TextField
                                    id="search"
                                    label="Search For"
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Use regular expressions"
                                />
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Case Sensitive"
                                />
                            </Box>
                            <Divider variant="middle" />
                            <Box p={3}>
                                <TextField
                                    id="replace"
                                    label="Replace With"
                                    variant="outlined"
                                    fullWidth
                                />

                                <Box pt={3}>
                                    <ToggleButtonGroup
                                        //value={alignment}
                                        exclusive
                                        //onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton
                                            value="lowercase"
                                            aria-label="lower case"
                                        >
                                            <FormatAlignLeftIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="pascalcase"
                                            aria-label="pascal case"
                                        >
                                            <FormatAlignCenterIcon />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="capitalized"
                                            aria-label="capitalized"
                                        >
                                            <FormatAlignRightIcon />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Box>
                            <Box p={3} pt={0}>
                                <Button
                                    onClick={collectFiles}
                                    variant="contained"
                                >
                                    Search
                                </Button>
                            </Box>
                        </FormGroup>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item md={9} xl={10}>
                <Paper elevation={3}>
                    <Box m={3} p={3}>
                        <TableContainer>
                            <Table
                                stickyHeader
                                sx={{ minWidth: 650 }}
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            Existing Mesh Path
                                        </TableCell>
                                        <TableCell>
                                            Modified Mesh Path
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {files.map((file) => (
                                        <Row key={file} row={file}></Row>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
