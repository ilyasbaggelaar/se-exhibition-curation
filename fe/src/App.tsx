import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ExhibitionPage from './pages/ExhibitionPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

function App() {

  return (
    <Router>
      <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/exhibition" element={<ExhibitionPage />} />
       <Route path="/loginpage" element={<LoginPage />} />
       <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </Router>
  )
}

export default App
