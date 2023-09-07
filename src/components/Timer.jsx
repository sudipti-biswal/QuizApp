import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Timer = ({ duration, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, onTimeout]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: "#c7f5b1",
        padding: "8px 20px",
        width: "30%",
        borderRadius: "20px 0px 20px 0px",
        marginLeft: "auto",
        marginTop: "20px",
        marginBottom: "20px",
        alignItems: "center",

        marginRight: "10px",
      }}
    >
      <Typography variant="h5" style={{ marginRight: "16px" }}>
        Time Remaining:
      </Typography>
      <CircularProgress
        variant="determinate"
        value={(timeRemaining / duration) * 100}
        size={50}
        thickness={8}
      />
      <Typography variant="h5" style={{ marginLeft: "16px" }}>
        {formatTime(timeRemaining)}
      </Typography>
    </Box>
  );
};

export default Timer;
