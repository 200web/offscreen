import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import BodyClassManager from "./BodyClassManager";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <BodyClassManager />
      <App />
    </Provider>
  </BrowserRouter>
);
