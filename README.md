# Spur AI Live Chat – Take-Home Assignment

A production-ready AI-powered customer support live chat built as part of the **Spur – Founding Full-Stack Engineer** take-home assignment.

This project simulates a realistic AI support agent for an e-commerce store, with conversation persistence, LLM integration, and a polished chat experience.

---

## FEATURES

- AI-powered customer support live chat
- Persistent conversations (refresh-safe)
- Real LLM integration (Groq)
- Robust backend with clean architecture
- Deployed frontend + backend
- Graceful handling of errors and edge cases

---

## Live Demo

- **Frontend (Vercel):**  
  https://spur-ai-live-chat-eosin.vercel.app

- **Backend API (Render):**  
  https://spur-ai-live-chat-backend-lc27.onrender.com

---

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Custom chat UI (scrollable, auto-scroll, loading states)
- Deployed on **Vercel**

### Backend

- Node.js + TypeScript
- Express
- Prisma ORM
- SQLite (simple SQL DB, suitable for this exercise)
- Deployed on **Render**

### LLM

- Groq API
- Model: `llama-3.1-8b-instant`
- Environment variable–based API key

---

## Architecture Overview

### Backend Structure

backend/
├── src/
│ ├── routes/ # HTTP routes (chat endpoints)
│ ├── services/ # Business logic (chat + LLM)
│ ├── repositories/ # DB access via Prisma
│ ├── prompts/ # System prompts / domain knowledge
│ ├── db/ # Prisma client
│ └── server.ts
├── prisma/
│ └── schema.prisma
└── package.json

**Key principles:**

- Clear separation of concerns
- LLM logic encapsulated in its own service
- Easy to extend for new channels (WhatsApp, Instagram, etc.)

---

## Core Features Implemented

### 1. Chat UI (Frontend)

- Scrollable message list
- Clear distinction between user & AI messages
- Input box + Send button
- Enter key sends message
- Auto-scroll to latest message
- Disabled input during API calls
- Persistent session (messages survive refresh)
- “New Chat” reset option

### 2. Backend API

- `POST /chat/message`
  - Input: `{ message, sessionId? }`
  - Output: `{ reply, sessionId }`
- `GET /chat/history`
  - Fetches full conversation by sessionId
- Messages are persisted with sender, text, timestamp

### 3. LLM Integration

- Real LLM API (Groq)
- API key via environment variables
- Conversation history included for contextual replies
- Guardrails:
  - Empty input blocked
  - Max message length enforced
  - API failures handled gracefully
  - Friendly error messages returned to UI

### 4. FAQ / Domain Knowledge

The AI is seeded with fictional store knowledge:

- Shipping policy
- Return & refund policy
- Support hours

This knowledge is embedded in the system prompt so the AI answers consistently.

### 5. Data Model & Persistence

**Conversation**

- `id`
- `createdAt`

**Message**

- `id`
- `conversationId`
- `sender` ("user" | "ai")
- `text`
- `createdAt`

On refresh, chat history is fetched and rendered automatically.

---

## Robustness & Edge Case Handling

The app was manually tested against:

- Empty messages
- Very long messages (>500 chars)
- Rapid consecutive sends
- Page refresh mid-conversation
- Backend downtime
- Invalid / missing LLM API key
- First-time users (new sessions)

All failures are handled gracefully without crashes.

---

## How to Run Locally

### Prerequisites

- Node.js 18+
- npm

---

### Backend Setup

```bash
cd backend
npm install

Create .env file in backend/:
DATABASE_URL="file:./dev.db"
GROQ_API_KEY=your_groq_api_key_here

Run Prisma migrations:
npx prisma migrate dev

Start backend:
npm run dev

Backend runs on:
http://localhost:4000


Frontend Setup:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


Environment Variables

Backend
DATABASE_URL
GROQ_API_KEY

Frontend:

VITE_BACKEND_URL (used for production deployment)

Deployment Notes

Backend deployed on Render

Frontend deployed on Vercel

Special care taken to ensure:

TypeScript builds pass in production

Prisma schema works correctly in hosted environment

Secrets are never committed

Design Decisions & Trade-offs

SQLite over PostgreSQL
Chosen for simplicity and speed in a take-home setting.

No Redis
Not required at this scale; DB persistence is sufficient.

No Authentication
Explicitly out of scope per assignment.

Prompt-based FAQ seeding
Simple, reliable, and easy to iterate.

If I Had More Time:

Add Redis for hot session caching

Add streaming AI responses

Improve observability (structured logs, tracing)

Multi-channel abstraction (WhatsApp / Instagram adapters)

Admin dashboard for conversation review


Submission Checklist:

✅ Public GitHub repository

✅ Deployed frontend URL

✅ Deployed backend URL

✅ Clear README with setup instructions

✅ No secrets committed


Author

Ayush Tiwari
Full-Stack Engineer

```
