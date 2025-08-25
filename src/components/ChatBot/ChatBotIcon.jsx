import React from "react";

const ChatBotIcon = ({ onClick }) => (
  <button
    className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg p-4 flex items-center justify-center"
    onClick={onClick}
    aria-label="Open ChatBot"
  >
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#2563eb" />
      <path d="M8 16h8M8 12h8M8 8h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
);

export default ChatBotIcon;