import { configureStore } from "@reduxjs/toolkit";
import teamCard from "./teamCardSlice";
import intro from "./introSlice";
import contactCard from "./contactCardSlice";
import scroll from "./scrollSlice";

export const store = configureStore({
  reducer: { teamCard, intro, contactCard, scroll },
});
