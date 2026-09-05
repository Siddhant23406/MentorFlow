# MentorFlow

MentorFlow is a Socratic AI coding mentor for DSA (Data Structures & Algorithms) practice. Instead of handing over solutions, it guides you toward them — escalating through progressively specific hints, and only revealing a full solution as an absolute last resort. Crucially, this behavior isn't left up to the LLM's discretion: a rule-based decision engine tracks your progress and hint level, deciding exactly when to nudge, hint, or reveal — the LLM only classifies your input and generates the wording, with no power to be talked into giving away the answer early.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **LLM:** Google Gemini API (gemini-3.5-flash-lite)
- **Other:** cors (cross-origin requests between frontend and backend)

## Features

- Chat-based interface for working through DSA problems
- Rule-based decision engine that controls hint escalation — not left to the LLM
- Progressive hint levels (vague nudge → specific guidance → full explanation, only as a last resort)
- Detects when a student is dodging the problem and redirects them back
- Tracks progress through multi-step problems and detects completion
- Interviewer-style mentor personality — terse, professional, no unprompted praise
- 20-problem library spanning easy, medium, and tough difficulty
- Session-based state, no login required

## Running Locally

**Backend**

```
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```
GEMINI_API_KEY=your_key_here
```
Then start the server:
```
node index.js
```

**Frontend**
In a separate terminal:
```
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) in your browser.

## Roadmap

- Selectable mentor personality (Interviewer vs. Senior Engineer)
- Persistent session storage (currently session-only, in-memory)
- Expanded problem library