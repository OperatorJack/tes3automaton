import {
    Paper,
    Box,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { workingDirectoryState } from "../../atoms";
import { collectFiles, respec } from "../../commands";
import { SelectDirectoryButton } from "./settings/SelectDirectoryButton";
import {
    LetterLowerCaseIcon,
    LetterPascalCaseIcon,
    LetterUpperCaseIcon,
    LetterCamelCaseIcon,
} from "../../assets/Icons";

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
    const [formState, setFormState] = useState({
        searchFor: "",
        replaceWith: "",
        useRegex: false,
        caseSensitive: false,
    });
    const [files, setFiles] = useState([] as string[]);

    const handleFormTextChange = function (evt: {
        target: {
            value: any;
            name: any;
        };
    }) {
        const value = evt.target.value;
        handleFormChange(evt.target.name, value);
    };
    const handleFormCheckboxChange = function (evt: {
        target: {
            checked: boolean;
            name: any;
        };
    }) {
        const value = evt.target.checked;
        handleFormChange(evt.target.name, value);
    };
    const handleFormChange = function (name: string, value: any) {
        console.log("Changing %s to %s", name, value);
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onClick = async function () {
        try {
            const files = await respec({
                rootDir: directory,
                searchFor: formState.searchFor,
                replaceWith: formState.replaceWith,
                useRegex: formState.useRegex,
                caseSensitive: formState.caseSensitive,
                previewOnly: false,
            });

            console.log(files);
            setFiles(files as string[]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} xl={2}>
                <Paper elevation={3}>
                    <Box m={3} p={2}>
                        <Typography variant="h6">Description</Typography>
                        <Typography variant="body2">
                            Asset Respec allows you to search for NIF files in a
                            directory and remap the NIF file and its related
                            textures to new file names. This is useful when you
                            are taking another mod's resources and you want to
                            re-name them in bulk to be used in your mod without
                            conflicts.
                        </Typography>
                    </Box>
                </Paper>
                <Paper elevation={3}>
                    <Stack m={3}>
                        <Box p={2}>
                            <SelectDirectoryButton />
                        </Box>
                        <Divider variant="middle" />
                        <Box p={2}>
                            <TextField
                                id="searchFor"
                                label="Search For Prefix"
                                variant="outlined"
                                fullWidth
                                value={formState.searchFor}
                                onChange={handleFormTextChange}
                                name="searchFor"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="useRegex"
                                        onChange={handleFormCheckboxChange}
                                        value={formState.useRegex}
                                    />
                                }
                                label="Use regular expressions"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="caseSensitive"
                                        onChange={handleFormCheckboxChange}
                                        value={formState.caseSensitive}
                                    />
                                }
                                label="Case Sensitive"
                            />
                        </Box>
                        <Divider variant="middle" />
                        <Box p={2} pb={1}>
                            <TextField
                                id="replaceWith"
                                label="Replace With Prefix"
                                variant="outlined"
                                fullWidth
                                value={formState.replaceWith}
                                onChange={handleFormTextChange}
                                name="replaceWith"
                            />
                        </Box>
                        <Box p={2} pt={1}>
                            <TextField
                                id="subfolder"
                                label="Replace Into Local Folder"
                                variant="outlined"
                                fullWidth
                            />

                            <Box pt={2}>
                                <ToggleButtonGroup
                                    //value={alignment}
                                    exclusive
                                    //onChange={handleAlignment}
                                    aria-label="text alignment"
                                >
                                    <ToggleButton
                                        value="lowercase"
                                        aria-label="lower case"
                                        title="Lower case"
                                    >
                                        <LetterLowerCaseIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="uppercase"
                                        aria-label="upper case"
                                        title="Upper case"
                                    >
                                        <LetterUpperCaseIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="pascal"
                                        aria-label="pascal case"
                                        title="Pascal case"
                                    >
                                        <LetterPascalCaseIcon />
                                    </ToggleButton>
                                    <ToggleButton
                                        value="camel"
                                        aria-label="camel case"
                                        title="Camel case"
                                    >
                                        <LetterCamelCaseIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Box>
                        <Box p={2} pt={0}>
                            <Button onClick={onClick} variant="contained">
                                Search
                            </Button>
                        </Box>
                        <Divider variant="middle" />
                        <Box p={2}>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Execute in existing directory"
                                title="Execute the operation without moving the files into a new subfolder structure. This is a dangerous action."
                            />
                        </Box>
                        <Box p={2} pt={0}>
                            <Button
                                color="warning"
                                onClick={onClick}
                                variant="contained"
                            >
                                Execute
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={10}>
                <Paper elevation={3}>
                    <Box m={3} p={3}>
                        <TableContainer>
                            <Table
                                stickyHeader
                                sx={{ minWidth: 650 }}
                                size="small"
                                aria-label="asset table"
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
