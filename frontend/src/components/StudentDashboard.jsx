import React from 'react';
import { useSelector } from 'react-redux';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Student Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>University: {user.university}</p>
          <p>Major: {user.major}</p>
          {/* Add more student details here */}
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
