import { Box, Button, Typography } from "@mui/material"

const Home = () => {
    return (
        <Box>
            <Typography>
                {"Welcome, userName."}
            </Typography>

            <Button>
                {"Visitors"}
            </Button>

            <Button>
                {"Log out"}
            </Button>
        </Box>
    )
}