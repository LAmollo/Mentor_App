// src/components/Profile/ProfileView.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../features/profile/profileSlice';

function ProfileView({ userId }) {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(fetchUserProfile(userId));
    }, [dispatch, userId]);

    return (
        <div className="profile">
            <h1>Profile View</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && profile && (
                <div className="profile-details">
                    <div>
                        <h2>{profile.name}</h2>
                        <p>Email: {profile.email}</p>
                        <p>Bio: {profile.bio}</p>
                    </div>
                    <div>
                        <h3>Activities:</h3>
                        <ul>
                            {profile.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileView;
