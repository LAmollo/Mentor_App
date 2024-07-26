import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

export const fetchCompanyProfile = createAsyncThunk('company/fetchCompanyProfile', async () => {
  const response = await API.get('/companies/profile');
  return response.data;
});

export const updateCompanyProfile = createAsyncThunk('company/updateCompanyProfile', async (profileData) => {
  const response = await API.put('/companies/profile', profileData);
  return response.data;
});

const companySlice = createSlice({
  name: 'company',
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
