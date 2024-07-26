import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
  const response = await API.get('/users/profile');
  return response.data;
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (profileData) => {
  const response = await API.put('/users/profile', profileData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
