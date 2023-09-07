import React from "react";
import {
  ListItem,
  ListItemText,
  FormControlLabel,
  Checkbox,
  List,
  Paper,
} from "@mui/material";

const Question = ({
  currentQuestion,
  selectedAnswers,
  currentQuestionIndex,
  handleAnswerSelect,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        padding: "50px",
      }}
    >
      <ListItemText primary={`${currentQuestion?.question}`} />

      <List>
        <ListItem>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {currentQuestion?.options.map((choice, choiceIndex) => (
              <FormControlLabel
                key={choiceIndex}
                control={
                  <Checkbox
                    checked={
                      selectedAnswers[currentQuestionIndex] === choiceIndex
                    }
                    onChange={() =>
                      handleAnswerSelect(currentQuestionIndex, choiceIndex)
                    }
                  />
                }
                label={choice}
              />
            ))}
          </div>
        </ListItem>
      </List>
    </Paper>
  );
};

export default Question;
