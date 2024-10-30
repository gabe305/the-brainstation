import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const PassionTimerControls = ({ passion }) => {
  const [remainingHours, setRemainingHours] = useState(passion.hours || 0);
  const [inputHours, setInputHours] = useState(passion.hours || "");
  const [isHoursSet, setIsHoursSet] = useState(false);
  const [isTimerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning && remainingHours > 0) {
      timer = setInterval(() => {
        setRemainingHours((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            alert(`Timer for ${passion.name} has reached zero.`);
            return 0;
          }
          return prev - 1 / 3600; // Decrement by 1 second
        });
      }, 1000); // 1 second in milliseconds
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, remainingHours, passion.name]);

  const handleSetHours = () => {
    const hours = parseFloat(inputHours);
    if (!isNaN(hours)) {
      setRemainingHours(hours);
      setIsHoursSet(true);
    }
  };

  const handleStartTimer = () => {
    if (isHoursSet) {
      setTimerRunning(true);
    }
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
    setIsHoursSet(false); // Allow changing hours again
  };

  const handleHoursChange = (e) => {
    if (!isTimerRunning) {
      const value = e.target.value;
      setInputHours(value);
    }
  };

  const formatTime = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <>
      <TextField
        label="Hours"
        type="number"
        value={inputHours}
        onChange={handleHoursChange}
        fullWidth
        disabled={isHoursSet && isTimerRunning}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSetHours}
        disabled={isHoursSet}
        style={{ marginTop: "8px" }}
      >
        Set Hours
      </Button>
      <Typography variant="body2">Total Hours: {inputHours}</Typography>
      <Typography variant="body2">
        Remaining: {formatTime(remainingHours)}
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleStartTimer}
        disabled={!isHoursSet || isTimerRunning}
        style={{ marginTop: "8px" }}
      >
        Start Timer
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={handleStopTimer}
        disabled={!isTimerRunning}
        style={{ marginTop: "8px" }}
      >
        Stop Timer
      </Button>
    </>
  );
};

export default PassionTimerControls;
