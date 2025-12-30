import { useEffect, useState } from "react";
import { sendChatMessage, fetchChatHistory } from "../api/chat.api";
import type { ChatMessage } from "../api/chat.api";

const GREETING: ChatMessage = {
  sender: "ai",
  text: "Hi there! I’m here to help with questions about shipping, returns, or support hours. How can I help today?",
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(() => {
    return localStorage.getItem("sessionId");
  });

  // Load history when sessionId changes or on mount
  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) {
        setMessages([GREETING]);
        return;
      }

      try {
        const data = await fetchChatHistory(sessionId);

        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        } else {
          setMessages([GREETING]);
        }
      } catch (err) {
        console.error("Failed to load history", err);
        setMessages([GREETING]);
      }
    };

    loadHistory();
  }, [sessionId]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (text.length > 500) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "That message is a bit long. Could you shorten it so I can help better?",
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text, sessionId || undefined);

      if (!sessionId) {
        localStorage.setItem("sessionId", res.sessionId);
        setSessionId(res.sessionId);
      }

      setMessages((prev) => [...prev, { sender: "ai", text: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I’m having trouble responding right now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    localStorage.removeItem("sessionId");
    setSessionId(null);
    setMessages([GREETING]);
  };

  return {
    messages,
    sendMessage,
    loading,
    startNewChat,
  };
};
