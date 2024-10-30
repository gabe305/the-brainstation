import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import PassionTimerControls from "./PassionTimerControls";

const ItemType = {
  CARD: "card",
};

type DragItem = {
  index: number;
};

const DraggableCard = ({ index, passion, passions, setPassions }) => {
  const handleDeletePassion = (index) => {
    const newPassions = passions.filter((_, i) => i !== index);
    setPassions(newPassions);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedPassion = passions[dragIndex];
    const newPassions = [...passions];
    newPassions.splice(dragIndex, 1);
    newPassions.splice(hoverIndex, 0, draggedPassion);
    setPassions(newPassions);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    hover: (item: DragItem) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card
        style={{
          marginBottom: "16px",
          borderRadius: "8px",
          border: "2px solid transparent",
          backgroundImage:
            "linear-gradient(white, white), radial-gradient(circle at top left, #40E0D0, #8A2BE2)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">{passion.name}</Typography>
            <IconButton onClick={() => handleDeletePassion(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <PassionTimerControls passion={passion} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableCard;
