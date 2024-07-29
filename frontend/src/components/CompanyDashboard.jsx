import React from 'react';
import { useSelector } from 'react-redux';

const CompanyDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Company Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Company: {user.company}</p>
          {/* Add more company details here */}
        </div>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
};

export default CompanyDashboard;
