import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const mountId = "faq-chat-root";
let mountNode = document.getElementById(mountId);

if (!mountNode) {
  mountNode = document.createElement("div");
  mountNode.id = mountId;
  document.body.appendChild(mountNode);
}

ReactDOM.createRoot(mountNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
