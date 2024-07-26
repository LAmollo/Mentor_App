// src/components/Profile/ActivityForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

function ActivityForm({ userId }) {
    const [activity, setActivity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/profile/${userId}/activities`, { activity });
            // Handle successful activity addition here
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Add Activity</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Activity Description"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    required
                />
                <button type="submit">Add Activity</button>
            </form>
        </div>
    );
}

export default ActivityForm;
