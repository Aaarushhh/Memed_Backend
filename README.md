# Meme'd Campaign Payout Tracker — Backend

Node.js + TypeScript + Express + MongoDB API for brands to run campaigns and creators to submit posts and track earnings.

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev
```

Health check: `GET http://localhost:<PORT>/api/ping`

## Folder Structure

```
src/
├── config/              # Env / app config
├── controller/          # Route handlers (class controllers)
│   ├── auth/
│   └── campaign/
├── lib/                 # DB clients (mongoose)
├── middleware/          # auth, authorize, validate, errors
├── model/               # Mongoose models
├── routes/              # Express routes
│   ├── auth/
│   └── campaign/
├── util/
│   ├── enum/
│   ├── helper/
│   └── interface/       # TypeScript interfaces
├── validator/           # Yup schemas
└── server.ts
```

## Auth API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup` | No | Body: `{ name, email, password, role }` — `role` is `brand` or `creator` |
| POST | `/api/auth/login` | No | Body: `{ email, password }` |
| GET | `/api/auth/me` | Bearer JWT | Current user |

Signup/login responses: `{ data: { token, user }, message }`. Send `Authorization: Bearer <token>` on protected routes.

## Brand / Campaign API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/campaigns` | Brand JWT | Create campaign: `{ name, platform, totalBudget, milestones: [{ views, payout }] }` |
| GET | `/api/campaigns` | Brand JWT | List own campaigns with `budgetSpent` and `budgetRemaining` |

`platform`: `Instagram` or `YouTube`. New campaigns are live by default. `budgetSpent` starts at `0` (updated when submission views change).

## Creator API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/campaigns/live` | Creator JWT | List live campaigns |
| POST | `/api/submissions` | Creator JWT | Submit post: `{ campaignId, postUrl }` |
| GET | `/api/submissions/earnings` | Creator JWT | Total earnings |

## Environment

See `.env.example` for required variables.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon + ts-node |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server |
| `npm test` | Run Jest tests |

## Stack

- Express 5 + TypeScript
- MongoDB via Mongoose
- JWT auth (`brand` / `creator` roles)
- Yup request validation
- Jest (payout / budget tests coming next)
