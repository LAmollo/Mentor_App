import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../features/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to load profile.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Academics:</strong> {profile.academics}</p>
          <p><strong>Sports:</strong> {profile.sports}</p>
          <p><strong>Internships:</strong> {profile.internships}</p>
          <p><strong>Work Experience:</strong> {profile.workExperience}</p>
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
};

export default UserProfile;
