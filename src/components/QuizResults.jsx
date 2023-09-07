import React from "react";
import { Typography, List, ListItem, Paper, Container } from "@mui/material";

const QuizResults = ({ questions, selectedAnswers, email }) => {
  return (
    <Container>
      <Typography
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "20px",
          fontWeight: "600",
          color: "#1851c5",
        }}
        variant="h5"
      >
        {email}'s Quiz Result
      </Typography>
      <List>
        {questions.map((question, questionIndex) => {
          const selectedAnswerIndex = selectedAnswers[questionIndex];
          const isAnswerCorrect =
            question.options[selectedAnswerIndex] === question.correctAnswer;

          // Check if selectedAnswerIndex is not defined (null or undefined)
          const selectedAnswer =
            selectedAnswerIndex != null
              ? question.options[selectedAnswerIndex]
              : "No answer selected"; // Static text when no choice is selected

          return (
            <ListItem key={questionIndex} style={{ marginBottom: "16px" }}>
              <Paper
                elevation={3}
                style={{
                  padding: "16px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">{questionIndex + 1}.</Typography>
                  <Typography variant="body1">{question.question}</Typography>
                </div>
                <Typography
                  variant="body1"
                  style={{
                    color: isAnswerCorrect ? "green" : "red",
                  }}
                >
                  Your Answer: {selectedAnswer}
                </Typography>
                <Typography variant="body1" style={{ color: "green" }}>
                  Correct Answer: {question.correctAnswer}
                </Typography>
              </Paper>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default QuizResults;
