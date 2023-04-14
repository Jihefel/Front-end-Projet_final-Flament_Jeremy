import { configureStore } from '@reduxjs/toolkit';
import unveiledSlice from '../features/unveiledSlice';

export const store = configureStore({
  reducer: {
    cardUnveiled: unveiledSlice,
  }
});