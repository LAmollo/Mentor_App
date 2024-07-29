import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/match');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    matches: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Your synchronous reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.loading = false;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default matchSlice.reducer;
