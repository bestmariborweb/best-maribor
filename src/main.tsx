import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";
import "./index.css";

// Set to false to show the full website again
const COMING_SOON = true;

createRoot(document.getElementById("root")!).render(COMING_SOON ? <ComingSoon /> : <App />);
