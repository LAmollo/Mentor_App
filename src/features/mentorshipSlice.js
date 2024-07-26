import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

export const fetchMentorships = createAsyncThunk('mentorship/fetchMentorships', async () => {
  const response = await API.get('/mentorships');
  return response.data;
});

export const createMentorship = createAsyncThunk('mentorship/createMentorship', async (mentorshipData) => {
  const response = await API.post('/mentorships', mentorshipData);
  return response.data;
});

const mentorshipSlice = createSlice({
  name: 'mentorship',
  initialState: { mentorships: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMentorships.fulfilled, (state, action) => {
        state.loading = false;
        state.mentorships = action.payload;
      })
      .addCase(fetchMentorships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMentorship.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMentorship.fulfilled, (state, action) => {
        state.loading = false;
        state.mentorships.push(action.payload);
      })
      .addCase(createMentorship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mentorshipSlice.reducer;
