import React, { useState } from "react";
import StartQuiz from "./components/StartQuiz";
import QuizComponent from "./components/QuizComponent";

const App = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [email, setEmail] = useState("");
  const [quizLoaded, setQuizLoaded] = useState(false);
  const [quizTimerActive, setQuizTimerActive] = useState(false);
  const [quizTimerExpired, setQuizTimerExpired] = useState(false);

  const startQuiz = (userEmail) => {
    setEmail(userEmail);
    setShowQuiz(true);
    setQuizTimerActive(true);
  };

  const handleTimeout = () => {
    setQuizTimerActive(false);
    setQuizTimerExpired(true);
    alert("Quiz time is up! Submitting quiz.");
  };

  const stopQuizTimer = () => {
    setQuizTimerActive(false);
  };

  const handleQuizLoaded = () => {
    setQuizLoaded(true);
  };

  return (
    <div>
      {!showQuiz ? (
        <StartQuiz onStart={startQuiz} />
      ) : quizTimerExpired ? (
        <QuizComponent
          onLoaded={handleQuizLoaded}
          stopQuizTimer={stopQuizTimer}
          quizTimerExpired={quizTimerExpired}
        />
      ) : (
        <>
          <QuizComponent
            onLoaded={handleQuizLoaded}
            stopQuizTimer={stopQuizTimer}
            quizTimerExpired={quizTimerExpired}
            email={email}
            quizTimerActive={quizTimerActive}
            handleTimeout={handleTimeout}
          />
        </>
      )}
    </div>
  );
};

export default App;
