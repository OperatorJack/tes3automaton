import {
    Container,
    Paper,
    Box,
    FormGroup,
    TextField,
    Checkbox,
    FormControlLabel,
    Divider,
} from "@mui/material";

export default function RespecView() {
    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box m={3}>
                    <FormGroup>
                        <Box p={3}>
                            <TextField
                                id="search"
                                label="Search For"
                                variant="outlined"
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
                            />
                        </Box>
                    </FormGroup>
                </Box>
            </Paper>
            <Paper elevation={3}>
                <Box m={3}></Box>
            </Paper>
        </Container>
    );
}
