import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const isTokenSet = localStorage.getItem('token')
        if(isTokenSet ){
            navigate('/dashboard')
        }
    },[])


    return (
        <div className="flex flex-col h-screen justify-center bg-gray-100">
            <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center">
                <div className="lg:w-1/2 w-full lg:pr-8 flex flex-col items-center lg:items-start lg:text-left text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Test Your Skills Today
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Take the first step towards mastering your core skills. 
                        <br />
                        Sign up today and start your journey with us!
                    </p>
                    <Link to="/signup">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                            Sign Up Now
                        </button>
                    </Link>
                </div>
                <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mb-8 lg:mb-0">
                    <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600 mb-4 text-center">
                            Already have an account? Log in to access your tests and results.
                        </p>
                        <Link to="/login">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 w-full">
                                Log In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
