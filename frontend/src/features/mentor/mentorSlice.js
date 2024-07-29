import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchMentors = createAsyncThunk(
  'mentor/fetchMentors',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/mentors');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Mentor Slice
const mentorSlice = createSlice({
  name: 'mentor',
  initialState: {
    mentors: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
