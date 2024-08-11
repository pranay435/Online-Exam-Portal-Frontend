import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './Question';
import UserContext from '../../contexts/UserContext';

function Test() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setLeftTime] = useState(1800);
    const [unauthorized, setUnauthorized] = useState(false);
    const [mailResults, setMailResults] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (id >= 0) {
            const url = `https://online-exam-portal-backend-1.onrender.com/test/test?subject=${id}`;
            axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
                .then((response) => {
                    setData(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setUnauthorized(true);
                        setLoading(false);
                    } else {
                        console.error('Error fetching data:', error);
                        setError(true);
                        setLoading(false);
                    }
                });
        } else {
            navigate('/dashboard');
        }

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            navigate('/dashboard');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [id, navigate]);

    useEffect(() => {
        if (submitted) return;

        const timer = setInterval(() => {
            setLeftTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Submit the test when time is up
                    return 0; // Ensure the timer doesn't go below 0
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer); // Clean up the interval on unmount
        };
    }, [submitted]);

    const handleAnswerChange = (qno, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [qno]: answer,
        }));
    };

    const handleChange = (e) => {
        setMailResults(e.target.checked); // Update the state based on the checkbox status
    };

    const handleSubmit = async () => {
        let score = 0;
        data.forEach((question, index) => {
            const questionNumber = index + 1;
            if (selectedAnswers[questionNumber] === question.correct_answer) {
                score++;
            }
        });

        const subjects = [
            'DataBase Management Systems',
            'Structured Query Language',
            'Object Oriented Programming',
            'Operating Systems',
            'Computer Networks',
        ];
        const subject = subjects[id];
        const currentTimeStamp = new Date();

        try {
            const response = await axios.post(
                'http://localhost:3000/test/postResults',
                {
                    user,
                    subject,
                    score,
                    currentTimeStamp,
                    mailResults,
                },
                {
                    headers: {
                        authorization: localStorage.getItem('token'),
                    },
                }
            );

            if (response.status === 200) {
                setSubmitted(true);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error posting results:', error);
        }
    };

    if (loading) {
        return <h2 className="text-center text-2xl font-semibold mt-6">Loading...</h2>;
    }

    if (error) {
        return <h2 className="text-center text-red-500 text-2xl font-semibold mt-6">Internal Server Error...</h2>;
    }

    if (unauthorized) {
        return <h2 className="text-center text-red-500 text-2xl font-semibold mt-6">Authorization Required...</h2>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                {/* Timer */}
                <div className="bg-red-600 text-white font-bold text-lg rounded-lg p-4 shadow-md">
                    Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </div>

                {/* Mail Results and Submit Button */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 h-12 px-4 py-2 border border-blue-300 rounded-md bg-blue-200">
                        <input
                            type="checkbox"
                            checked={mailResults}
                            onChange={handleChange}
                            id="toggleCheckbox"
                            className="form-checkbox h-6 w-6 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <label htmlFor="toggleCheckbox" className="text-md text-gray-800 font-semibold">Mail Results</label>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit Exam
                    </button>
                </div>
            </div>

            {data.map((question, index) => (
                <Question
                    key={index}
                    qno={index + 1}
                    question={question.question}
                    a={question.options[0]}
                    b={question.options[1]}
                    c={question.options[2]}
                    d={question.options[3]}
                    answer={question.correct_answer}
                    onAnswerChange={handleAnswerChange}
                    selectedOption={selectedAnswers[index + 1]} // Pass selected option for controlled input
                />
            ))}
        </div>
    );
}

export default Test;
