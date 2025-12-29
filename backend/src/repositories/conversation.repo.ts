import prisma from "../db/prisma";

export const createConversation = async () => {
  return prisma.conversation.create({
    data: {},
  });
};

export const getConversationById = async (conversationId: string) => {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
  });
};
