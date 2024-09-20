import React, { useState } from 'react';
import {QUESTIONS} from "./questions";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // start from question 1
  const [yesCount, setYesCount] = useState<number>(0);
  const [totalRuns, setTotalRuns] = useState<number>(0);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [scores, setScores] = useState<number[]>([]);

  // Get the total number of questions from the QUESTIONS object
  const totalQuestions = Object.keys(QUESTIONS).length;

  // Handler for Yes/No answer
  const handleAnswer = (answer: 'yes' | 'no') => {
    if (answer === 'yes') {
      setYesCount(yesCount + 1);
    }

    // Move to the next question
    if (currentQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score after all questions are attempted
      const score: number = (100 * (yesCount + (answer === 'yes' ? 1 : 0))) / totalQuestions;
      setScores([...scores, score]);
      setOverallScore(overallScore + score);
      setTotalRuns(totalRuns + 1);
      setCompleted(true);
    }
  };

  // Reset states to initial values for new run
  const handleRestart = () => {
    setYesCount(0);
    setCurrentQuestionIndex(1); // Reset to the first question
    setCompleted(false);
  };

  // Calculate average score of all runs
  const averageScore = totalRuns > 0 ? overallScore / totalRuns : 0;

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6 text-center">
        <h1 className="mb-4">Yes/No Questions</h1>
        {!completed ? (
          <div>
            <div className="border rounded p-4 mb-4">
              <h3>{QUESTIONS[currentQuestionIndex]}</h3>
            </div>
            <div className="d-flex justify-content-around mb-4">
              <button 
                className="btn btn-success btn-lg" 
                onClick={() => handleAnswer('yes')}
              >
                Yes
              </button>
              <button 
                className="btn btn-danger btn-lg" 
                onClick={() => handleAnswer('no')}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="mb-4">Your Score: {scores[scores.length - 1].toFixed(2)}%</h2>
            <h3>Total Runs: {totalRuns}</h3>
            <h3>Average Score: {averageScore.toFixed(2)}%</h3>
            <button 
              className="btn btn-primary btn-lg mt-4" 
              onClick={handleRestart}
            >
              Once More
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;
