import React from "react";
import App from "./App";
// import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
