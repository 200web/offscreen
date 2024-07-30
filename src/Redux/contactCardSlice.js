import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [4, 4, 4, 4],
  otherValues: ["", "", "", ""],
};

export const contactCardSlice = createSlice({
  name: "contactCard",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.cards = action.payload;
    },
    setOtherValue: (state, action) => {
      const { index, value } = action.payload;
      state.otherValues[index] = value;
    },
  },
});

export const { setItems, setOtherValue } = contactCardSlice.actions;

export default contactCardSlice.reducer;
