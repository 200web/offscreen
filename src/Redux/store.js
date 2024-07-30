import { configureStore } from "@reduxjs/toolkit";
import teamCard from "./teamCardSlice";
import intro from "./introSlice";
import contactCard from "./contactCardSlice";

export const store = configureStore({
  reducer: { teamCard, intro, contactCard },
});
