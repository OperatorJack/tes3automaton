import { Box, Container, FormGroup, Paper } from "@mui/material";
import { DarkModeToggleButton } from "./settings/DarkModeToggleButton";
import { SelectDirectoryButton } from "./settings/SelectDirectoryButton";
import { ZoomSelector } from "./settings/ZoomSelector";

export default function SettingsView() {
    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box m={3} pt={3}>
                    <FormGroup>
                        <DarkModeToggleButton />
                    </FormGroup>
                </Box>
                <Box m={3}>
                    <FormGroup>
                        <ZoomSelector />
                    </FormGroup>
                </Box>
                <Box m={3} pb={3}>
                    <FormGroup>
                        <SelectDirectoryButton />
                    </FormGroup>
                </Box>
            </Paper>
        </Container>
    );
}
