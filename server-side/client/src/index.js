//External Lib Import
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//Internal Lib Import
import "./Assets/css/bootstrap.css";
import "./Assets/css/animate.min.css";
import "./Assets/css/custom.css";

import App from "./App";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
