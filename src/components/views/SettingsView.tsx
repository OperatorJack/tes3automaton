import {
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Paper,
} from "@mui/material";
import { DarkModeToggleButton } from "./settings/DarkModeToggleButton";
import { SelectDirectoryButton } from "./settings/SelectDirectoryButton";

export default function SettingsView() {
    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box m={3}>
                    <FormGroup>
                        <DarkModeToggleButton />
                    </FormGroup>
                </Box>
            </Paper>
            <Paper elevation={3}>
                <Box m={3}>
                    <FormGroup>
                        <SelectDirectoryButton />
                    </FormGroup>
                </Box>
            </Paper>
        </Container>
    );
}
