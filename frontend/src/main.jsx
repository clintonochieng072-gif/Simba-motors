import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Ensure CSS loads before JS
document.body.classList.add('css-loaded');

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
