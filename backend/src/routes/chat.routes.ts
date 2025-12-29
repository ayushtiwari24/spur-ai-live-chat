import { Router } from "express";
import { handleChatMessage } from "../services/chat.service";

const router = Router();

router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await handleChatMessage(message.trim(), sessionId);

    res.json(result);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
});

export default router;
