import { commonStyles } from "@/sharedStyles"
import { Visitor } from "@/utils/visitor.utils"
import { Box, Typography } from "@mui/material"

interface VisitorBadgeProps {
    visitor: Visitor
    position: { x: number, y: number }
}

const VisitorBadge = ({visitor, position}: VisitorBadgeProps) => {
    return (
        <Box
            key={visitor.id}
            sx={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 4,
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              minWidth: 200,
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ color: commonStyles.colors.darkBrown }}>
              {visitor.name || `Visitor #${visitor.id}`}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
              {visitor.visitorState}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", marginTop: 1 }}>
              {visitor.avatarState.animal}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {visitor.avatarState.element}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {visitor.avatarState.item}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {visitor.avatarState.power}
            </Typography>
          </Box>
    )
}

export default VisitorBadge