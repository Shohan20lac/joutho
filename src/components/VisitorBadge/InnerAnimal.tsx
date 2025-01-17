import { Box } from "@mui/material"
import React from "react"
import Image from "next/image";

export interface InnerAnimalProps {
  imageSrc: string
}

const InnerAnimal = ({imageSrc}: InnerAnimalProps) => {
    return (
        <Box
            sx={{
            position: "absolute",
            width: "50%", // Animal icon is smaller
            height: "50%",
            zIndex: 3,
            display: "flex", // Centers the image within the container
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%", // Make the icon circular
            }}
        >
            <Image
            src={imageSrc}
            alt="Animal Icon"
            layout="intrinsic"
            width={100}
            height={100}
            />
        </Box>
    )
}

export default InnerAnimal