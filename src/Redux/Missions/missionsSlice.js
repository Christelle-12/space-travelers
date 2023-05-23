import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
};

const missionsURL = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const resp = await axios(missionsURL);
    return resp.data;
  } catch (err) {
    return err.message;
  }
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.data = action.payload.map((each) => ({
          name: each.mission_name,
          id: each.mission_id,
          description: each.description,
          more: each.wikipedia,
        }));
        state.loading = false;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.Error = action.payload;
      });
  },
});

export default missionsSlice.reducer;
