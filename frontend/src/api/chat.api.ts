export type ChatMessage = {
  sender: "user" | "ai";
  text: string;
};

export type ChatResponse = {
  reply: string;
  sessionId: string;
};

export const sendChatMessage = async (
  message: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const res = await fetch("http://localhost:4000/chat/message", {
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
    `http://localhost:4000/chat/history?sessionId=${sessionId}`
  );

  if (!res.ok) {
    throw new Error("Failed to load chat history");
  }

  return res.json();
};
