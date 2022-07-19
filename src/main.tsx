import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./test";

import { AudioProvider } from "./context/audio-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AudioProvider>
      <App />
    </AudioProvider>
  </React.StrictMode>
);
