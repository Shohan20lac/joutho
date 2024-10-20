import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { commonStyles } from "@/sharedStyles";
import { io } from "socket.io-client";
import { CardSelectionStatus } from "./animal";
import { socketUrl } from "../../../../../socketConfig";

const itemOptions = ["key", "shield", "compass"] as const;
type SelectedItem = typeof itemOptions[number] | ""

export default function ItemSelection() {
  const [itemSelectionStatus, setItemSelectionStatus] = useState<CardSelectionStatus>("selecting");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>("");

  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  const router = useRouter();

  useEffect(() => {
    const newSocket = io(socketUrl)
    setSocket(newSocket);

    newSocket.on('updateItemSelection', ({ newValue, newStatus }) => {
      setSelectedItem(newValue);
      setItemSelectionStatus(newStatus);

      if (newStatus === 'confirmed') {
        router.push("/stall/tablet/character-creation/power");
      }
    });
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: commonStyles.colors.lightBrown,
        height: '85vh',
        justifyContent: "center",  // Centers content vertically
        alignItems: "center",      // Centers content horizontally
      }}
    >
      {/* Brown Container for the Heading */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          width: '92%',  // Full width
          padding: '30px', // Give enough padding for the text
          backgroundColor: commonStyles.colors.brown, // Brown background
          marginBottom: 4,
        }}
      >
        <Typography fontWeight={'bold'} fontFamily={'monospace'} variant="h4" sx={{ textAlign: "center", color: "white" }}>
          Pick a magic item to save the world.
        </Typography>
      </Box>

      {/* Grid for the items */}
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" // Centers the grid horizontally
        alignItems="center"     // Aligns the items inside grid vertically
        sx={{ width: '100%' }}  // Ensures the grid takes up the full width
      >
        {itemOptions.map((item) => (
          <Grid item xs={4} key={item}>
            <Box
              onClick={() => {
                if (socket)
                  socket.emit('requestItem', item);
                setSelectedItem(item);
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
                border: 
                  selectedItem === item 
                  ? 
                    itemSelectionStatus === 'requested'
                    ? "2px solid green"
                    : "1px solid gray"
                  : 
                    "none",
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 10,
                background: `linear-gradient(145deg, ${commonStyles.colors.darkBrown}, ${commonStyles.colors.veryDarkBrown})`, // Gradient background
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)', // Outer shadow for realism
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)', // Subtle zoom effect on hover
                  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                },
              }}
            >
              <Image src={`/images/item/${item}.png`} alt={item} width={280} height={280} />
              <Typography marginTop={2} color='white' fontFamily={'monospace'} fontSize={30}>{item}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
