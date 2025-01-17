import { Box, Avatar, Typography } from "@mui/material";
import { UserStatus } from "@/utils";

interface BubbleProps {
    image: string | null;
    label: string;
    status: UserStatus;
}

const Bubble = ({ image, label, status }: BubbleProps) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            padding: "10px",
            borderRadius: "16px",
            backgroundColor: status === UserStatus.ACTIVE ? "green" : "gray",
            color: "white",
        }}
    >
        <Avatar src={image ?? undefined} sx={{ marginRight: 1 }} />
        <Typography variant="body1">{label}</Typography>
    </Box>
);

export default Bubble;