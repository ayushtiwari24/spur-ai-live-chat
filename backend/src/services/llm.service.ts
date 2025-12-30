import OpenAI from "openai";

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generateAIReply = async (
  messages: LLMMessage[]
): Promise<string> => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 600,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content || !content.trim()) {
      return "I’m having a bit of trouble responding right now. Could you try again?";
    }

    return content.trim();
  } catch (error) {
    console.error("LLM error:", error);
    return "I’m having trouble responding at the moment. Please try again shortly.";
  }
};
