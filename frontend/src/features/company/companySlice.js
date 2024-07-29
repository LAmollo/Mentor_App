import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/companies');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Company Slice
const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchCompanies.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchCompanies.fulfilled]: (state, action) => {
      state.loading = false;
      state.companies = action.payload;
    },
    [fetchCompanies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default companySlice.reducer;
