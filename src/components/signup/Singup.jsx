import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [conflict, setConflict] = useState(false);
    const navigate = useNavigate();
    const [filled, setFilled] = useState(true);

    const handleSignup = async (e) => {
        e.preventDefault();
        setConflict(false); // Reset conflict state on new submission

        if (!username || !password || !email) {
            setFilled(false);
        } else {
            setFilled(true);
        }

        try {
            const response = await axios.post('https://online-exam-portal-backend-1.onrender.com/auth/signup', { username, password, email });

            if (response.status === 200) {
                console.log("Successfully Signed Up...");
                setUsername('');
                setPassword('');
                setEmail('');
                navigate('/');
            }
        } catch (error) {
            setConflict(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={username}
                            id="username"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Signup
                    </button>
                </form>
                {conflict && filled && <p className="mt-4 text-red-500 text-center">User already exists...</p>}
                {!filled && <p className="mt-4 text-red-500 text-center">Fill all the fields...</p>}
            </div>
        </div>
    );
};

export default Signup;
