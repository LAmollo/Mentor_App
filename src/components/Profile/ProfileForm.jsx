// src/components/Profile/ProfileForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function ProfileForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [activities, setActivities] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/profile', { name, email, bio, activities });
            // Handle successful profile creation/update here
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Profile Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <textarea
                    placeholder="Activities (comma-separated)"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value.split(','))}
                />
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
}

export default ProfileForm;
