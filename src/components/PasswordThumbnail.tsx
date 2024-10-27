import { Box } from "@mui/material";
import Image from "next/image";

interface PasswordThumbnailProps {
    image: string
    onClick: any
}

const PasswordThumbnail = ({ image, onClick }: PasswordThumbnailProps) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        border: "2px solid #4b9cd3",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
      }}
      onClick={onClick}
    >
      <Image src={image} alt="Password Thumbnail" width={50} height={50} />
    </Box>
  );
};

export default PasswordThumbnail;
