import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  Stack,
  Box,
} from "@mui/material";

import { fetchQuizQuestions } from "../data/api";
import QuizResults from "./QuizResults";
import Question from "./Question";
import QueNumber from "./QueNumber";
import Timer from "./Timer";

const QuizComponent = ({
  stopQuizTimer,
  quizTimerExpired,
  email,
  quizTimerActive,
  handleTimeout,
}) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const quizQuestions = await fetchQuizQuestions();
      const initialSelectedAnswers = new Array(quizQuestions.length).fill(null);
      setSelectedAnswers(initialSelectedAnswers);
      setQuestions(quizQuestions);

      if (quizQuestions.length > 0) {
        setVisitedQuestions([0]);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitQuiz = () => {
    stopQuizTimer();
    setQuizSubmitted(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setAttemptedQuestions([...attemptedQuestions, questionIndex]);
  };

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);

    if (!visitedQuestions.includes(questionIndex)) {
      setVisitedQuestions([...visitedQuestions, questionIndex]);
    }
  };

  const renderOverviewPanel = () => {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Questions</Typography>
        <hr />
        <List
          style={{
            display: "flex",
            flexWrap: "wrap",

            justifyContent: "center",
          }}
        >
          {questions.map((question, questionIndex) => (
            <ListItem
              key={questionIndex}
              onClick={() => handleQuestionClick(questionIndex)}
              button
              selected={currentQuestionIndex === questionIndex}
              style={{
                width: "50px",
                margin: "4px",
                textAlign: "center",
                borderRadius: "0px 10px 0px 0px",
                backgroundColor: attemptedQuestions.includes(questionIndex)
                  ? "#007bff"
                  : visitedQuestions.includes(questionIndex)
                  ? "#f7a90d"
                  : "#00000073",
              }}
            >
              <ListItemText
                primary={`${questionIndex + 1}`}
                style={{
                  color: "#fff",
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (quizSubmitted || quizTimerExpired) {
    return (
      <QuizResults
        questions={questions}
        selectedAnswers={selectedAnswers}
        currentQuestion={currentQuestion}
        email={email}
      />
    );
  }

  return (
    <>
      {quizTimerActive && (
        <Timer duration={30 * 60} onTimeout={handleTimeout} />
      )}
      <Container
        maxWidth="lg"
        style={{
          backgroundColor: "#b3a17e",
          padding: "40px 30px 40px 40px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box display="flex">
          <QueNumber renderOverviewPanel={renderOverviewPanel} />
          <Question
            currentQuestion={currentQuestion}
            selectedAnswers={selectedAnswers}
            currentQuestionIndex={currentQuestionIndex}
            handleAnswerSelect={handleAnswerSelect}
          />
        </Box>

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginLeft: "auto",
              marginTop: "20px",
              marginRight: "10px",
              fontSize: "15px",
              padding: "10px 24px",
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleSubmitQuiz}
          >
            Submit Answers
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default QuizComponent;
