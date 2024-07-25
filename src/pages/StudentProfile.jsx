// src/pages/StudentProfile.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../features/profile/profileSlice';

function StudentProfile() {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(fetchUserProfile('student-id')); // Replace 'student-id' with actual ID
    }, [dispatch]);

    return (
        <div>
            <h1>Student Profile</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && profile && (
                <div>
                    <h2>{profile.name}</h2>
                    <p>Email: {profile.email}</p>
                    {/* Add more profile details here */}
                </div>
            )}
        </div>
    );
}

export default StudentProfile;
