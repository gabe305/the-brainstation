import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import MorningPages from "./MorningPages";
import PassionTrackerSection from "./PassionTrackerSection";

const MainDashboard = () => {
  const [passions, setPassions] = useState([
    { name: "Melee", ratio: 3, hours: 0 },
    { name: "Coding", ratio: 1, hours: 0 },
  ]);
  const [morningPages, setMorningPages] = useState("");

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Productivity Hub
      </Typography>
      <Grid container spacing={3}>
        <PassionTrackerSection passions={passions} setPassions={setPassions} />
        <MorningPages
          morningPages={morningPages}
          setMorningPages={setMorningPages}
        />
      </Grid>
    </Box>
  );
};

export default MainDashboard;
