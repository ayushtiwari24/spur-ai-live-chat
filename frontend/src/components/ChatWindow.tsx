import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

export const ChatWindow = () => {
  const { messages, sendMessage, loading, startNewChat } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title">Support</div>
        <div className="chat-status">
          <span className="chat-status-dot" />
          Online now
        </div>
      </div>

      {/* Reset */}
      <button className="reset-link" onClick={startNewChat}>
        Start new conversation
      </button>

      {/* Quick Info */}
      <div className="quick-info">
        <button
          className="quick-chip"
          onClick={() => sendMessage("What is your shipping policy?")}
        >
          🚚 Shipping
        </button>
        <button
          className="quick-chip"
          onClick={() => sendMessage("What is your return policy?")}
        >
          🔁 Returns
        </button>
        <button
          className="quick-chip"
          onClick={() => sendMessage("What are your support hours?")}
        >
          🕒 Support Hours
        </button>
      </div>

      {/* Chat */}
      <div className="chat-box">
        {messages.map((m, i) => (
          <MessageBubble key={i} sender={m.sender} text={m.text} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about shipping, returns, or support hours…"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(input);
              setInput("");
            }
          }}
        />
        <button
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};
