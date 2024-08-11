import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Results = () => {
    const { user, setUser } = useContext(UserContext);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user from localStorage and set it in the context
        const storedUser = localStorage.getItem('user');
        console.log(storedUser);
        setUser(storedUser);



        // Only proceed if user is set
        if (storedUser) {
            const fetchResults = async () => {
                try {
                    console.log("User:", storedUser);
                    
                    const response = await fetch(`https://online-exam-portal-backend-1.onrender.com/test/results?user=${encodeURIComponent(storedUser)}`,
                    {
                        headers: {
                            authorization: localStorage.getItem('token')
                        }
                    }
                
                );
                    
                    if (!response.ok) {
                        console.log('Error fetching results');
                    } else {
                        const data = await response.json();
                        console.log('Results:', data);
                        setResults(data);
                    }
                } catch (error) {
                    console.log('Fetch error:', error);
                }
            };

            fetchResults();
        }
        else{
            
            navigate('/dashboard')
        }
    }, [setUser]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Exam Results</h1>
            <div className="space-y-4 ">
                {results.map((result, index) => (
                    <div key={index} className="shadow-lg rounded-lg p-6 border border-gray-200 bg-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">Subject: {result.subject}</h3>
                        <p className="text-lg text-gray-700">Marks: {result.marks}</p>
                        <p className="text-lg text-gray-700">Grade: {result.grade}</p>
                        <p className="text-lg text-gray-700">Time: {new Date(result.test_time).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
