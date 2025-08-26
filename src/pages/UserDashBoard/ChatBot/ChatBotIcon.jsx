import React from "react";

const ChatBotIcon = ({ onClick }) => (
  <button
    className="fixed bottom-8 right-8 z-50 bg-blue-900 hover:bg-blue-800 rounded-full shadow-lg p-2 flex items-center justify-center"
    onClick={onClick}
    aria-label="Open ChatBot"
  >
    <img
      src="/chat-bot-assistant.gif"
      alt="ChatBot"
      className="w-8 h-8 md:w-15 md:h-15"
      style={{ display: "block" }}
    />
  </button>
);

export default ChatBotIcon;