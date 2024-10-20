import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Image from 'next/image';
import { io } from "socket.io-client";
import { commonStyles } from "@/sharedStyles";
import { socketUrl } from "../../../../socketConfig";

interface Visitor {
  name: string;
  animal: string;
  element: string;
  item: string;
  power: string;
}

const constructVisitorObject = (visitorTraits: string) => {
  const traitsArray = visitorTraits.split(",");
  const [name, animal, element, item, power] = traitsArray;
  return { name, animal, element, item, power };
};

export default function StallMonitor() {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [visitorCount, setVisitorCount] = useState(0); // Visitor count state

  useEffect(() => {
    const newSocket = io (socketUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit("getVisitors");
    });

    newSocket.on('gotVisitors', (visitorList) => {
      console.log('got visitors', visitorList);

      // Update visitor count based on the list length
      setVisitorCount(visitorList.length);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stack the logo and welcome content vertically
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "#fff", // White text for contrast
      }}
    >
      {/* Visitor Counter in the top-right corner */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 24,
          backgroundColor: commonStyles.colors.darkBrown, // Transparent black background
          padding: "8px 16px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color='white' fontFamily="Monospace" fontSize={35}>
          Visitors Today:
        </Typography>
        <Typography variant="h6" fontWeight="bold" color='white' fontFamily="Monospace" fontSize={35}>
          {visitorCount}
        </Typography>
      </Box>

      <Box>
        <Image
          src="/images/joutho.png"
          alt="Joutho Logo"
          width={400}
          height={400}
          style={{
            marginBottom: 16, // Add space between the logo and the welcome content
          }}
        />
      </Box>

      <Box
        sx={{
          padding: 6,
          mindWidth: 1000,
          maxWidth: 900,
          alignItems: 'center',
          textAlign: "center",
          borderRadius: 2,
          color: "#fff",
          marginBottom: 16, // Add space between the welcome content and the monitor content
        }}
      >
        {/* Subheader: A brief description of the mission */}
        <Typography color="#3ba94f" variant="h4" gutterBottom fontFamily="Monospace">
          A platform for connecting lifelong acts of kindness.
        </Typography>

        {/* Optional Monitor Content if Any */}
        <Typography variant="body1" fontSize={22}>
          {/* No change to this content */}
        </Typography>
      </Box>
    </Box>
  );
}
