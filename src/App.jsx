// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import CompanyProfile from './pages/CompanyProfile';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import CompanyDashboard from './components/Dashboard/CompanyDashboard';
import MentorMatching from './components/Dashboard/MentorMatching';

function App() {
    return (
        <Router>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/student" element={<StudentProfile />} />
                <Route path="/profile/company" element={<CompanyProfile />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/company" element={<CompanyDashboard />} />
                <Route path="/dashboard/mentor-matching" element={<MentorMatching />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
