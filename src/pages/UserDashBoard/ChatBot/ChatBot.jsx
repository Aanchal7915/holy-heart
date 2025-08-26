import React, { useState } from "react";
import ChatBotIcon from "./ChatBotIcon";
import ChatBotWindow from "./ChatBotWindow";
import { getBotResponse } from "./ChatBotEngine";

const backendUrl = import.meta.env.VITE_BACKEND || import.meta.env.backend || "http://localhost:8000";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm HealthBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState({step:"main"});
  const [options, setOptions] = useState([
    { label: "Service Enquiry", value: "service_enquiry" },
    { label: "Appointment Enquiry", value: "appointment_enquiry" },
    { label: "Book Appointment", value: "book_appointment" }
  ]);

  const handleSend = async (msg, isOption = false) => {
    setMessages((prev) => [...prev, { from: "user", text: isOption ? (options.find(o => o.value === msg)?.label || msg) : msg }]);
    setInput("");
    const token = localStorage.getItem("token");
    const res = await getBotResponse(msg, context, backendUrl, token);
    setMessages((prev) => [...prev, { from: "bot", text: res.text }]);
    setContext(res.context || {});
    setOptions(res.options || []);
  };

  return (
    <>
      <ChatBotIcon onClick={() => setOpen(true)} />
      {open && (
        <ChatBotWindow
          messages={messages}
          onSend={handleSend}
          onClose={() => setOpen(false)}
          input={input}
          setInput={setInput}
          options={options}
          context={context}
        />
      )}
    </>
  );
};

export default ChatBot;