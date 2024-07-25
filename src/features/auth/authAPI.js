// src/features/auth/authAPI.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};
