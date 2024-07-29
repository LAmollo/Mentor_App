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

// Match Slice
const matchSlice = createSlice({
  name: 'match',
  initialState: {
    matches: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchMatches.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMatches.fulfilled]: (state, action) => {
      state.loading = false;
      state.matches = action.payload;
    },
    [fetchMatches.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default matchSlice.reducer;
