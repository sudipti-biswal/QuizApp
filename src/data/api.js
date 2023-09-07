export const fetchQuizQuestions = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const data = await response.json();

    if (data.results) {
      return data.results.map((question) => {
        const options = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        return {
          question: question.question,
          options: options,
          correctAnswer: question.correct_answer,
        };
      });
    } else {
      console.error("Error fetching quiz questions: ", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching quiz questions: ", error);
    return [];
  }
};
