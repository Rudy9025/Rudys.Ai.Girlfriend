import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  
import { ChatProvider } from "./hooks/useChat";
import "./index.css";
import { AnimationProvider } from './components/AnimationContext';  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatProvider>
      <AnimationProvider>
        <App />  
      </AnimationProvider>
    </ChatProvider>
  </React.StrictMode>
);
