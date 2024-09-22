import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paul from "../assets/img/paul.jpg";
import Dmitry from "../assets/img/Dmitry.jpg";
import Andrei from "../assets/img/Andrei.jpg";
import Jonny from "../assets/img/Jonny.jpg";
import Egor from "../assets/img/Egor.jpg";

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
      profession: "Founder, director",
      name: "Paul Gerassi",
      description: [
        "8 years of video production, three short films, thousands of hours of content created, festival of short films SOI Warsaw -  best feature film, graduated Prague Film School, ",
        "Throughout my career as a director, I've explored a diverse range of formats, from short videos to feature films. I possess a unique ability to tell compelling stories and highlight the most important aspects, regardless of the format or duration.",
        "My varied background and professional education enable me to be flexible, balancing academic precision with artistic freedom to create innovations and push the boundaries.",
      ],
      image: paul,
    },
    {
      id: 1,
      profession: "Co-founder, producer",
      name: "Dmitry Shabaldin",
      description: [
        "As a seasoned cinematographer with 20 years of on-set experience, I’ve worked on everything from small student short films to major television series. In the past two years, I’ve expanded my expertise into producing and managing production processes. I bring a blend of creativity and professionalism to every project, ensuring your vision comes to life.",
      ],
      image: Dmitry,
    },
    {
      id: 2,
      profession: "Producer, cinematographer",
      name: "Egor Efimov",
      description: [
        "I am a Warsaw-based cinematographer with a passion for documentary-style shooting, focusing on capturing authentic moments and realistic movements. Skilled in post-production, especially in color correction, I enjoy working on compelling television projects and documentary films. As a highly professional and collaborative team member, I bring my expertise to every project. I graduated from film schools in Belarus and Poland, and I'm fluent in both Polish and English.",
      ],
      image: Egor,
    },
    {
      id: 3,
      profession: "VFX artist, designer",
      name: "Jonny Symmetry",
      description: [
        "With extensive experience as a motion and VFX designer, I've collaborated with leading IT companies such as UFC, SPRIBE, EASYBRAIN, SAY GAMES, BEATHEAD, BITLICA, and CIFRA LTD. My work also includes creating content for renowned MMA fighters like Alex Pereira, Johnny Walker, and Merab Dvalishvili. Recently, I had the opportunity to shoot for the artist Skriptonit.",
        "Additionally, I've contributed to major production projects, including working with the news and history-focused production company City Dog. I'm currently involved in developing a new season of their historical show.",
      ],
      image: Jonny,
    },
    {
      id: 4,
      profession: "Client Manager / Gaffer",
      name: "Andrei Iofe Mdivani",
      description: [
        "As a passionate Gaffer and Cinematographer with several years of experience in the film industry, I've honed my skills on diverse projects, including the 48HPF, where my lighting work as part of the cinematography team was recognized with the Best Cinematography award. My passion for visual storytelling extends beyond lighting; my own short film has been screened at multiple horror festivals. I bring not only technical expertise but also a client-centric approach, ensuring clear communication and a collaborative spirit to bring every vision to life. I'm always learning and growing, excited for the future in this ever-evolving industry.",
      ],
      image: Andrei,
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
