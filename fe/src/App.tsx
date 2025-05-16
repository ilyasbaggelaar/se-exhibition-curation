import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ExhibitionPage from './pages/ExhibitionPage';

function App() {

  return (
    <Router>
      <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/search" element={<SearchPage />} />
       <Route path="/exhibition" element={<ExhibitionPage />} />

      </Routes>
    </Router>
  )
}

export default App
