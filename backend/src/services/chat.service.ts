import {
  createConversation,
  getConversationById,
} from "../repositories/conversation.repo";
import {
  createMessage,
  getMessagesByConversationId,
} from "../repositories/message.repo";
import { generateAIReply, type LLMMessage } from "./llm.service";
import { SYSTEM_PROMPT } from "../prompts/support.prompt";

/**
 * Handle a single chat message
 */
export const handleChatMessage = async (
  message: string,
  sessionId?: string
) => {
  let conversationId = sessionId;

  // Ensure conversation exists
  if (!conversationId) {
    const conversation = await createConversation();
    conversationId = conversation.id;
  } else {
    const existing = await getConversationById(conversationId);
    if (!existing) {
      const conversation = await createConversation();
      conversationId = conversation.id;
    }
  }

  // Save user message
  await createMessage(conversationId, "user", message);

  // Fetch recent history (sliding window)
  const history = await getMessagesByConversationId(conversationId, 6);

  const llmMessages: LLMMessage[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...history.map<LLMMessage>((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
    {
      role: "user",
      content: message,
    },
  ];

  const reply = await generateAIReply(llmMessages);

  // Save AI reply
  await createMessage(conversationId, "ai", reply);

  return {
    reply,
    sessionId: conversationId,
  };
};

/**
 * Fetch chat history with inactivity auto-reset (24h)
 */
export const getChatHistory = async (sessionId: string) => {
  const messages = await getMessagesByConversationId(sessionId, 50);

  if (messages.length === 0) {
    return [];
  }

  const lastMessage = messages[messages.length - 1];
  const lastMessageTime = new Date(lastMessage.createdAt);
  const now = new Date();

  const hoursDiff =
    (now.getTime() - lastMessageTime.getTime()) / (1000 * 60 * 60);

  // ⏰ Auto-reset after 24 hours of inactivity
  if (hoursDiff > 24) {
    return [];
  }

  return messages.map((m) => ({
    sender: m.sender,
    text: m.text,
  }));
};
