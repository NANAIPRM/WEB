import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HouseDataProvider } from "./contexts/HouseDataContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <HouseDataProvider>
    <App />
  </HouseDataProvider>
);
