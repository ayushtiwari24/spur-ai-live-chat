import { createConversation } from "../repositories/conversation.repo";
import { createMessage } from "../repositories/message.repo";

export const handleChatMessage = async (
  message: string,
  sessionId?: string
) => {
  let conversationId: string;

  if (sessionId) {
    conversationId = sessionId;
  } else {
    const conversation = await createConversation();
    conversationId = conversation.id;
  }

  // Save user message
  await createMessage(conversationId, "user", message);

  // Temporary AI reply (LLM comes in Phase 4)
  const aiReply = "Thanks for your message! Our AI agent will respond shortly.";

  // Save AI message
  await createMessage(conversationId, "ai", aiReply);

  return {
    reply: aiReply,
    sessionId: conversationId,
  };
};
