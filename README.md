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
├── config/
├── controller/
│   ├── auth/
│   ├── campaign/
│   └── submission/
├── lib/
├── middleware/
├── model/
├── routes/
│   ├── auth/
│   ├── campaign/
│   └── submission/
├── util/
│   ├── enum/
│   ├── helper/
│   └── interface/
├── validator/
└── server.ts
```

## Auth API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup` | No | `{ name, email, password, role }` — `brand` or `creator` |
| POST | `/api/auth/login` | No | `{ email, password }` |
| GET | `/api/auth/me` | Bearer JWT | Current user |

## Brand / Campaign API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/campaigns` | Brand | Create campaign |
| GET | `/api/campaigns` | Brand | Own campaigns with spent / remaining |

## Creator API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/campaigns/live` | Creator | List live campaigns |
| POST | `/api/submissions` | Creator | `{ campaignId, postUrl }` |
| GET | `/api/submissions/earnings` | Creator | Total earnings |

## Views / Payouts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| PATCH | `/api/submissions/:id/views` | None | `{ views }` — simulates platform data |

## Assumptions

- Payout is the **highest** milestone crossed (not the sum of milestones).
- If views jump across multiple milestones in one update, only the highest applies.
- Payout never decreases on later updates (no clawback / no double-pay).
- If remaining campaign budget is less than the next payout increase, the creator receives only the remaining budget (partial payout), so the campaign never overspends.
- New campaigns are live by default.

## Environment

See `.env.example`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm test` | Jest unit tests (payout + budget cap) |
