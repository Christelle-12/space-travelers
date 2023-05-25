import { configureStore } from '@reduxjs/toolkit';
import missionReducer from './Missions/missionsSlice';
import rocketReducer from './Rockets/RocketsSlice';

const Store = configureStore({
  reducer: {
    missions: missionReducer,
    rockets: rocketReducer,
  },
});

export default Store;
