import React, { useRef, useEffect } from "react";

const ChatBotWindow = ({ messages, onSend, onClose, input, setInput, options, context }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Only show input field for date and message step in book appointment
  const showInput =
    (context?.step === "book_date" || context?.step === "book_message")
  console.log("ChatBotWindow context:", context, "showInput:", showInput);

  return (
    <div className="fixed bottom-24 right-8 z-50 w-80 max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b bg-blue-600 rounded-t-xl">
        <span className="text-white font-bold">HealthBot</span>
        <button onClick={onClose} className="text-white text-xl font-bold">&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2" style={{ maxHeight: 300 }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-lg ${msg.from === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-800"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Option buttons - scrollable if too many */}
      {options && options.length > 0 && (
        <div className="overflow-y-auto max-h-40 flex flex-col gap-2 px-3 pb-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mb-1 text-left"
              onClick={() => onSend(opt.value, true)}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex border-t px-2 py-2 bg-gray-50 rounded-b-xl"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) onSend(input.trim());
        }}
      >
        <input
          className="flex-1 px-2 py-1 rounded border"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={!showInput}
          autoFocus
        />
        <button
          disabled={!showInput}
          type="submit"
          className="ml-2 px-3 py-1 bg-blue-600 text-white rounded font-semibold">
          Send
        </button>
      </form>

    </div>
  );
};

export default ChatBotWindow;