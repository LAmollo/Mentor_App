// src/components/Dashboard/StudentDashboard.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../features/profile/profileSlice';

function StudentDashboard() {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(fetchUserProfile('student-id')); // Replace 'student-id' with actual ID
    }, [dispatch]);

    return (
        <div>
            <h1>Student Dashboard</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && profile && (
                <div>
                    <h2>{profile.name}</h2>
                    <p>Email: {profile.email}</p>
                    {/* Add more profile details and functionalities here */}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
