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
  const [loginRequired, setLoginRequired] = useState(false);
  const [options, setOptions] = useState([
    { label: "Service Enquiry", value: "service_enquiry" },
    { label: "Appointment Enquiry", value: "appointment_enquiry" },
    { label: "Book Appointment", value: "book_appointment" }
  ]);

  const handleSend = async (msg, isOption = false) => {
    const token = localStorage.getItem("token");
    // const bookingKeywords = ["book_appointment", "appointment", "consultation", "book consultation", "book a consultation"];
    // const isBookingQuery = bookingKeywords.some(keyword =>
    //   (isOption && msg === keyword) ||
    //   (!isOption && msg.toLowerCase().includes(keyword.replace(/_/g, " "))) // covers text queries
    // );

    // // If not logged in and booking query, always block and show login message
    // if (!token && isBookingQuery) {
    //   setMessages((prev) => [...prev, { from: "user", text: isOption ? (options.find(o => o.value === msg)?.label || msg) : msg }]);
    //   setMessages((prev) => [...prev, { from: "bot", text: "To book a consultation, please log in first." }]);
    //   setLoginRequired(true);
    //   setInput("");
    //   return;
    // }

    // // If loginRequired is set and user is now logged in, notify and allow booking
    // if (loginRequired && token) {
    //   setLoginRequired(false);
    //   setMessages((prev) => [...prev, { from: "bot", text: "You are now logged in. You can book a consultation." }]);
    // }

    // // If booking is blocked due to login requirement, block all booking queries
    // if (loginRequired && isBookingQuery) {
    //   setMessages((prev) => [...prev, { from: "bot", text: "To book a consultation, please log in first." }]);
    //   setInput("");
    //   return;
    // }

    setMessages((prev) => [...prev, { from: "user", text: isOption ? (options.find(o => o.value === msg)?.label || msg) : msg }]);
    setInput("");
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