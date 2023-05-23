import { configureStore } from '@reduxjs/toolkit';
import missionReducer from './Missions/missionsSlice';

const Store = configureStore({
  reducer: {
    missions: missionReducer,
  },
});

export default Store;
