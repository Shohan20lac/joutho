import { commonStyles } from "@/sharedStyles";
import { SelectionState } from "@/utils";
import { Visitor, VisitorState } from "@/utils";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import InnerFrame from "./InnerFrame";
import InnerAnimal from "./InnerAnimal";
import OuterFrame from "./OuterFrame";

interface VisitorBadgeProps {
  visitor: Visitor;
  onClick: () => void;
}

const VisitorBadge = ({ visitor, onClick }: VisitorBadgeProps) => {
  console.log("about to render VisitorBadge with visitor:", visitor);
  const { name, avatarState } = visitor;
  const { animal, item } = avatarState;

  const outerFrameSrc = `/images/outer/outer.jpg`;
  const innerFrameSrc = `/images/inner/inner_${item.value}.jpg`;
  const animalIconSrc = `/images/animal/${animal.value}_${avatarState.element.value ?? 'generic'}.jpg`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 200,
        position: "relative",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          width: 200,
          height: 200,
          position: "relative",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          overflow: "hidden",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <OuterFrame imageSrc={outerFrameSrc} />

        {item.selectionState !== SelectionState.IDLE && (
          <InnerFrame imageSrc={innerFrameSrc} />
        )}

        {animal.selectionState !== SelectionState.IDLE && (
          <InnerAnimal imageSrc={animalIconSrc}/>
        )}
      </Box>

      {/* Visitor Name Below the Card */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 1,
          color: commonStyles.colors.darkBrown,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {name || `Visitor #${visitor.id}`}
      </Typography>
    </Box>
  );
};

export default VisitorBadge;
