# Meme'd Campaign Payout Tracker — Backend

Node.js + TypeScript + Express + MongoDB API for brands to run campaigns and creators to submit posts and track earnings.

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev
```

Health check: `GET http://localhost:<PORT>/api/ping`

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
