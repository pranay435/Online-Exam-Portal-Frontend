import React, { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const url = "https://online-exam-portal-backend.onrender.com/auth/login";
            const response = await axios.post(url, { username, password });
    
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.username);
                setUser(localStorage.getItem('user'));
                setInvalidCredentials(false);
                navigate('/dashboard'); // Redirect to dashboard
            } else if (response.status === 401) {
                setInvalidCredentials(true);
            }
    
        } catch (error) {
            console.log(error);
            setInvalidCredentials(true);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
                {invalidCredentials && <div className="text-red-800 text-2xl bold mt-4">Invalid Credentials</div>}
            </form>
        </div>
    );
};

export default Login;
