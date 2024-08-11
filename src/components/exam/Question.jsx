import React from "react";

const Question = ({ qno, question, a, b, c, d, selectedOption, onAnswerChange }) => {
  const handleChange = (event) => {
    onAnswerChange(qno, event.target.value);
  };

  return (
    <div className="bg-gray-300 shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{qno}. {question}</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`a-${qno}`}
            name={`question-${qno}`} 
            value={a}
            checked={selectedOption === a}
            onChange={handleChange}
            className="text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={`a-${qno}`} className="text-gray-700">{a}</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`b-${qno}`}
            name={`question-${qno}`} 
            value={b}
            checked={selectedOption === b}
            onChange={handleChange}
            className="text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={`b-${qno}`} className="text-gray-700">{b}</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`c-${qno}`}
            name={`question-${qno}`} 
            value={c}
            checked={selectedOption === c}
            onChange={handleChange}
            className="text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={`c-${qno}`} className="text-gray-700">{c}</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id={`d-${qno}`}
            name={`question-${qno}`} 
            value={d}
            checked={selectedOption === d}
            onChange={handleChange}
            className="text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor={`d-${qno}`} className="text-gray-700">{d}</label>
        </div>
      </div>
    </div>
  );
};

export default Question;
