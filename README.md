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
│   └── auth/
├── lib/                 # DB clients (mongoose)
├── middleware/          # auth, authorize, validate, errors
├── model/               # Mongoose models
├── routes/              # Express routes
│   └── auth/
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
