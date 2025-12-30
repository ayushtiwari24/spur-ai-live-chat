import { Router } from "express";
import { handleChatMessage, getChatHistory } from "../services/chat.service";

const router = Router();

router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    if (message.length > 500) {
      return res.status(400).json({
        error: "Message is too long. Please keep it under 500 characters.",
      });
    }

    const result = await handleChatMessage(message.trim(), sessionId);
    res.json(result);
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({ error: "AI service is temporarily unavailable." });
  }
});

router.get("/history", async (req, res) => {
  try {
    const sessionId = req.query.sessionId as string;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const messages = await getChatHistory(sessionId);
    res.json({ messages });
  } catch (err) {
    console.error("History route error:", err);
    res.status(500).json({ error: "Failed to load chat history" });
  }
});

export default router;
