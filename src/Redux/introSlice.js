import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaded: false,
};

export const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setIsLoaded } = introSlice.actions;

export default introSlice.reducer;
