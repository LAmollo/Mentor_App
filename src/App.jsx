// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import CompanyProfile from './pages/CompanyProfile';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
