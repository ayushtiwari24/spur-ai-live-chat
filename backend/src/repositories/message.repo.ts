import prisma from "../db/prisma";

export const createMessage = async (
  conversationId: string,
  sender: "user" | "ai",
  text: string
) => {
  return prisma.message.create({
    data: {
      conversationId,
      sender,
      text,
    },
  });
};

export const getMessagesByConversationId = async (
  conversationId: string,
  limit = 10
) => {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: limit,
  });
};
