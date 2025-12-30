export type ChatMessage = {
  sender: "user" | "ai";
  text: string;
};

export type ChatResponse = {
  reply: string;
  sessionId: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const sendChatMessage = async (
  message: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const res = await fetch(`${API_BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
};

export const fetchChatHistory = async (
  sessionId: string
): Promise<{ messages: ChatMessage[] }> => {
  const res = await fetch(
    `${API_BASE_URL}/chat/history?sessionId=${sessionId}`
  );

  if (!res.ok) {
    throw new Error("Failed to load chat history");
  }

  return res.json();
};
