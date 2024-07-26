import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';
import companyReducer from './features/companySlice';
import mentorshipReducer from './features/mentorshipSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    mentorship: mentorshipReducer,
  },
});

export default store;
