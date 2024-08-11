import React, { useContext, useEffect } from 'react';
import TestComponent from '../test/TestComponent';
import UserContext from '../../contexts/UserContext'; // Adjust the import path if needed
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);

    if (!storedUser) navigate('/');
  }, [user, navigate, setUser]);

  const subjects = [
    { name: 'Database Management Systems', id: 0 },
    { name: 'Structured Query Language', id: 1 },
    { name: 'Object Oriented Programming', id: 2 },
    { name: 'Operating Systems', id: 3 },
    { name: 'Computer Networks', id: 4 }
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    setUser('');
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">
      {/* Header Container */}
      <div className="w-full bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-gray-800 text-3xl font-semibold">
              Welcome back, {user}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to='/results'
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Results
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Take Your Test Section */}
        <div className="w-full bg-gray-300 p-8 rounded-lg shadow-md mb-8 flex items-center justify-center">
          <h1 className="text-center text-4xl font-bold text-gray-800">
            Take Your Test Today
          </h1>
        </div>

        {/* Test Components Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map(subject => (
            <TestComponent
              key={subject.id}
              id={subject.id}
              name={subject.name}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
