import { Box } from "@mui/material"
import React from "react"
import Image from "next/image";

export interface InnerFrameProps {
  imageSrc: string
}

const InnerFrame = ({imageSrc}: InnerFrameProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "80%", // Inner frame is slightly smaller
        height: "80%",
        zIndex: 2,
        display: "flex", // Centers the image within the container
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={imageSrc}
        alt="Inner Frame"
        layout="intrinsic"
        width={200}
        height={200}
      />
    </Box>
  )
}

export default InnerFrame