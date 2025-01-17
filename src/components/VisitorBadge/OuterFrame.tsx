import { Box } from "@mui/material"
import React from "react"
import Image from "next/image";

export interface OuterFramProps {
    imageSrc: string
}

const OuterFrame = ({imageSrc}: OuterFramProps) => {
    return (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={imageSrc}
            alt="Outer Frame"
            layout="fill"
            objectFit="cover"
          />
        </Box>
    )
}

export default OuterFrame