import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../features/userSlice';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [academics, setAcademics] = useState('');
  const [sports, setSports] = useState('');
  const [internships, setInternships] = useState('');
  const [workExperience, setWorkExperience] = useState('');

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setAcademics(profile.academics || '');
      setSports(profile.sports || '');
      setInternships(profile.internships || '');
      setWorkExperience(profile.workExperience || '');
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ academics, sports, internships, workExperience }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <input type="text" value={academics} onChange={(e) => setAcademics(e.target.value)} placeholder="Academics" />
      <input type="text" value={sports} onChange={(e) => setSports(e.target.value)} placeholder="Sports" />
      <input type="text" value={internships} onChange={(e) => setInternships(e.target.value)} placeholder="Internships" />
      <input type="text" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} placeholder="Work Experience" />
      <button type="submit">Update</button>
    </form>
  );
};

export default ProfileForm;
