import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset timer
      onAnswered(false); // Call onAnswered with false
      return; // Exit early to prevent setting a timeout
    }

    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId); // Cleanup function to prevent memory leaks
  }, [timeRemaining, onAnswered]); // Dependencies

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
