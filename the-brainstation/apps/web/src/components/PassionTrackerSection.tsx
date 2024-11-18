import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCard from "./DraggableCard";

const PassionTrackerSection = ({ passions, setPassions }) => {
  const [newPassionName, setNewPassionName] = useState("");

  const handleAddPassion = () => {
    if (newPassionName.trim()) {
      setPassions([...passions, { name: newPassionName, hours: 0, ratio: 0 }]);
      setNewPassionName("");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Passions</Typography>
          <Box mb={2}>
            <TextField
              label="New Passion"
              value={newPassionName}
              onChange={(e) => setNewPassionName(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPassion}
              style={{ marginTop: "8px" }}
            >
              Add Passion
            </Button>
          </Box>
          {passions.map((passion, index) => (
            <DraggableCard
              key={index}
              index={index}
              passion={passion}
              passions={passions}
              setPassions={setPassions}
            />
          ))}
        </Paper>
      </Grid>
    </DndProvider>
  );
};

export default PassionTrackerSection;
