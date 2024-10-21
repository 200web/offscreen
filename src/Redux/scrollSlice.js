import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollToElement: "",
};

export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollToElement: (state, action) => {
      state.scrollToElement = action.payload;
    },
    clearScrollToElement: (state) => {
      state.scrollToElement = "";
    },
  },
});

export const { setScrollToElement, clearScrollToElement } = scrollSlice.actions;

export default scrollSlice.reducer;
