//External Lib Import
import { createRoot } from "react-dom/client";

//Internal Lib Import
import App from "./App";
import { LoadingContextProvider } from "./context/LoadingContext";
import "./Assets/css/bootstrap.css";
import "./Assets/css/animate.min.css";
import "./Assets/css/custom.css";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <LoadingContextProvider>
    <App />
  </LoadingContextProvider>,
);
