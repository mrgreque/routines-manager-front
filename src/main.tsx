import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Router />
    
);
