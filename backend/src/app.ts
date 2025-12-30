import express, { Request, Response } from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Spur AI Live Chat Backend is running");
});

app.use("/chat", chatRoutes);

export default app;
