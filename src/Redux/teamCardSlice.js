import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dima from "../assets/img/dima.webp";
import chel from "../assets/img/chel.webp";

export const fetchCards = createAsyncThunk(
  "card/fetchCardStatus",
  async (param, thunkAPI) => {
    const { category } = param;
    const { data } = await axios.get(
      `https://641b41749b82ded29d4e2ced.mockapi.io/cards${category}`
    );

    if (data.length === 0) return thunkAPI.rejectWithValue("error");

    return data;
  }
);

const initialState = {
  cards: [
    {
      id: 0,
      profession: "Art Director",
      name: "Dmitry Astap",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: dima,
    },
    {
      id: 1,
      profession: "CEO - Director",
      name: "Paul Gerassi",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: chel,
    },
    {
      id: 2,
      profession: "Art Director",
      name: "Dmitry Astap",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: dima,
    },
    {
      id: 3,
      profession: "CEO - Director",
      name: "Paul Gerassi",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: chel,
    },
    {
      id: 4,
      profession: "Art Director",
      name: "Dmitry Astap",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: dima,
    },
    {
      id: 5,
      profession: "CEO - Director",
      name: "Paul Gerassi",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: chel,
    },
    {
      id: 6,
      profession: "Art Director",
      name: "Dmitry Astap",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: dima,
    },
    {
      id: 7,
      profession: "CEO - Director",
      name: "Paul Gerassi",
      description: [
        "8 years of video production, three short films, thousands of hours of content created, festival of short films SOI Warsaw -  best feature film, graduated Prague Film School.",
        "Throughout my career as a director, I've explored a diverse range of formats, from short videos to feature films. I possess a unique ability to tell compelling stories and highlight the most important aspects, regardless of the format or duration.",
        "My varied background and professional education enable me to be flexible, balancing academic precision with artistic freedom to create innovations and push the boundaries.",
      ],
      image: chel,
    },
    {
      id: 8,
      profession: "Art Director",
      name: "Dmitry Astap",
      description: [
        "We believe in the power of stories that inspire, educate, and entertain. We believe in the power of stories that inspire, educate, and entertain. ",
      ],
      image: dima,
    },
  ],
  status: "loading",
};

export const teamCardSlice = createSlice({
  name: "teamCard",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.sortedCards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
        state.cards = [];
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = "success";
      })
      .addCase(fetchCards.rejected, (state) => {
        state.status = "error";
        state.cards = [];
      });
  },
});

export const { setItems } = teamCardSlice.actions;

export default teamCardSlice.reducer;
