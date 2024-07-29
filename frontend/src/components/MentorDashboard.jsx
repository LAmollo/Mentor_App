import React from 'react';
import { useSelector } from 'react-redux';

const MentorDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Mentor Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Company: {user.company}</p>
          <p>Expertise: {user.expertise.join(', ')}</p>
          {/* Add more mentor details here */}
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
};

export default MentorDashboard;
