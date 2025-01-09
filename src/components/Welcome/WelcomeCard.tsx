import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { commonStyles } from "@/sharedStyles";
import { AvatarState, EventName } from "@/pages/welcome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { getDocRef } from "@/utils/event.utils";
import { EventType } from "@/const/event.const";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { io } from "socket.io-client";
import { socketUrl } from "../../../socketConfig";
import { ADMIN_BYPASS_STRING } from "@/const/system.const";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { VisitorState } from "@/utils/visitor.utils";

// Constants for Text and Labels
const WELCOME_MESSAGE = "Welcome to Joutho!";
const DESCRIPTION_MESSAGE = "A platform for connecting \n lifelong acts of kindness.";
const PROMPT_MESSAGE = "Who are you?";

// Reusable Styles
const styles = {
  container: {
    display: "flex",         // Enables flexbox
    justifyContent: "center", // Horizontally centers items
    alignItems: "center",    // Vertically centers items
    alignSelf: "center",     // Centers the container itself
    margin: 'auto',
    width: 150,
    height: 150,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: commonStyles.colors.lightBrown,
    border: `4px solid ${commonStyles.colors.lightBrown}`,
  },
  heading: {
    color: commonStyles.colors.veryDarkBrown,
    fontFamily: "monospace",
    fontSize: 28,
    fontWeight: "bold",
    mb: 1,
  },
  description: {
    fontFamily: "monospace",
    whiteSpace: "pre-line",
    mb: 3,
  },
  question: {
    color: commonStyles.colors.darkBrown,
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 20,
    whiteSpace: "pre-line",
  },
};

// Button style as a pure function to avoid inline creation
const getButtonStyle = (enabled: boolean) => ({
  mt: 2,
  backgroundColor: enabled ? commonStyles.colors.accent : "none",
});

interface WelcomeCardProps {
  avatarState: AvatarState
  setAvatarState: Dispatch<SetStateAction<AvatarState>>
  setVisitorState: Dispatch<SetStateAction<VisitorState>>
}

const WelcomeCard = ({
  avatarState,
  setAvatarState,
  setVisitorState,
}: WelcomeCardProps) => {
  const [loading, setLoading] = useState(false)
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null)
  const router = useRouter();

  useEffect (() => {
    const newSocket = io (socketUrl)
    setSocket (newSocket)
  },[])

  const handleContinue = async () => {
    if (avatarState.name === ADMIN_BYPASS_STRING) {
      console.log("Admin bypass detected. Transitioning to admin panel.");
      router.push (
        "/admin",
        undefined,
        { shallow: false }
      )
  
      if (socket) {
        socket.emit ("ADMIN_MANNED_STALL", {
          stallId: uuid(),
          adminId: ADMIN_BYPASS_STRING,
          timestamp: new Date().toISOString(),
        })
      } else {
        console.error("Socket not initialized.");
      }
      return;
    }
  
    const auth = getAuth();
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
        console.log("Signed in anonymously.");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  
    setLoading(true);
    try {
      const docRef = getDocRef(EventType.STALL_EVENT);
      if (!docRef) throw new Error("Failed to get document reference.");
  
      await setDoc(
        docRef,
        {
          action: EventName.STALL_ACTIVITY_CHANGED,
          data: {
            visitorState: VisitorState.ENTER_PASSWORD,
            avatarState: avatarState,
          },
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );
  
      setVisitorState(VisitorState.ENTER_PASSWORD);
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      alert("Failed to continue. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };
  


  console.log ('rendering WElcomeCard with avatarState:', avatarState)

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 4,
        maxWidth: 500,
        textAlign: "center",
        backgroundColor: commonStyles.colors.parchment,
        margin: "10px",
      }}
    >
      {/* Circular Image */}
      <Box sx={styles.container}>
        <Image
          src="/images/joutho.jpg"
          alt="joutho"
          width={150} // Fixed width
          height={150} // Fixed height
          style={{
            display: "flex", // Ensures the image respects flex container alignment
          }}
        />
      </Box>


      {/* Welcome Text */}
      <Typography sx={styles.heading}>{WELCOME_MESSAGE}</Typography>
      <Typography sx={styles.description}>{DESCRIPTION_MESSAGE}</Typography>
      <Typography sx={styles.question}>{PROMPT_MESSAGE}</Typography>

      {/* Input Field */}
      <TextField
        variant="standard"
        fullWidth
        value={avatarState.name}
        onChange={(e) => {
          console.log ("Got Input event:", e);
          setAvatarState({
            ...avatarState,
            name: e.target.value,
          })
        }}
        sx={{
          mt: 2,
          mb: 3,
          input: { textAlign: "center" }, // Center text using `sx`
        }}
      />

      {/* Continue Button */}
      <Button
        variant={avatarState.name ? "contained" : "text"}
        onClick={handleContinue}
        disabled={!avatarState.name || loading}
        sx={getButtonStyle(!!avatarState.name)}
      >
        {loading ? "Loading..." : "Continue"}
      </Button>
    </Paper>
  );
};

export default WelcomeCard;