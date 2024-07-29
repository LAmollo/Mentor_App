import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/students');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Student Slice
const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default studentSlice.reducer;
