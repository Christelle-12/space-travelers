import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  isFetch: false,
};

const rocketsURL = 'https://api.spacexdata.com/v3/rockets';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  try {
    const response = await axios.get(rocketsURL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,

  reducers: {
    reserveRocket: (state, action) => {
      const id = action.payload;
      state.data = state.data.map((each) => {
        if (each.id === id) {
          each.reserved = true;
        }
        return each;
      });
    },
    cancelReserve: (state, action) => {
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
      .addCase(fetchRockets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.data = action.payload.map((each) => ({
          flickrImages: each.flickr_images,
          id: each.id,
          name: each.rocket_name,
          description: each.description,
        }));
        state.loading = false;
        state.isFetch = true;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { reserveRocket, cancelReserve } = rocketsSlice.actions;
export default rocketsSlice.reducer;
