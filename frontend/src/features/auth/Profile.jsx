import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>
          {/* Display more user details here */}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
