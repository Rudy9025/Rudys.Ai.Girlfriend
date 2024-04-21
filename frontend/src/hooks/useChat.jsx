import { createContext, useContext, useState } from "react";

const backendUrl = "https://ai-girlfriend-backend.onrender.com";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [text, setText] = useState("");


  const chat = async (msg) => {
    try {
      const data = await fetch(`${backendUrl}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg }),
      });
      const { text } = await data.json();
      console.log(text);
      setText(text);
      setMessages((messages) => [...messages, { text }]);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <ChatContext.Provider value={{ chat, message, text }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
