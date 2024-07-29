import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Profile from './features/auth/Profile';
import MatchList from './features/match/MatchList';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/match" element={<MatchList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
