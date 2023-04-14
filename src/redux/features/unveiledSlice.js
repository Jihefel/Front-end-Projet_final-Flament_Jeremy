import { createSlice } from '@reduxjs/toolkit';

const initialState = {status: false};

export const unveiledSlice = createSlice({
  name: 'cardUnveiled',
  initialState,
  reducers: {
    unveilTheCard: (state) => {
      state.status = true
    },
  },
});

export const { unveilTheCard } = unveiledSlice.actions;

export default unveiledSlice.reducer;