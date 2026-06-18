import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);
