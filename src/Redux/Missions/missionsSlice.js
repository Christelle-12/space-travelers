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
  reducers: {
    joinMission: (state, action) => {
      const id = action.payload;
      state.data = state.data.map((each) => {
        if (each.id === id) {
          each.reserved = true;
        }
        return each;
      });
    },
    leaveMission: (state, action) => {
      const id = action.payload;
      state.data = state.data.map((each) => {
        if (each.id === id) {
          each.reserved = false;
        }
        return each;
      });
    },
  },
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

export const { joinMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
