import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Test from './components/exam/Test.jsx';
import Question from './components/exam/Question.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Singup.jsx'
import UserContextProvider from './contexts/UserContextProvider.jsx'
import Results from './components/results/Results.jsx';

function App() {

  

  return (
    <Router>
      <UserContextProvider>
        
      <Routes>
        
        <Route path='/' element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test/:name" element={<Test />} />
        <Route path="/login" element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/results' element={<Results />} />
        
        
      </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
