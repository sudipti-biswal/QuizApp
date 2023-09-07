import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

const QueNumber = ({ renderOverviewPanel }) => {
  const renderStatusItem = (backgroundColor, text) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor,
          borderRadius: "50%",
          marginRight: "4px",
        }}
      />
      <Typography style={{ fontSize: "14px", fontWeight: "600" }}>
        {text}
      </Typography>
    </div>
  );

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        marginRight: "20px",
        width: "25%",
        backgroundColor: "#f0f0f0",
      }}
    >
      {renderOverviewPanel()}
      <hr />
      <Stack direction="row" justifyContent="space-around">
        {renderStatusItem("#00000073", "Not Visited")}
        {renderStatusItem("#f7a90d", "Visited")}
        {renderStatusItem("#007bff", "Attempted")}
      </Stack>
    </Paper>
  );
};

export default QueNumber;
