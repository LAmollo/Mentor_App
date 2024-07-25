// src/features/profile/profileAPI.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile'; // Replace with your backend URL

export const fetchUserProfile = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
};
