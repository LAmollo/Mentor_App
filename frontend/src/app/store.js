import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/company/companySlice';
import mentorReducer from '../features/mentor/mentorSlice';
import studentReducer from '../features/student/studentSlice';
import matchReducer from '../features/match/matchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    mentor: mentorReducer,
    student: studentReducer,
    match: matchReducer,
  },
});

export default store;
