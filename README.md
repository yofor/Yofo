# NaijaMarket MVP

NaijaMarket is a trust-first P2P commerce platform for Nigeria focused on safe transactions and income generation.

## One-line pitch

> NaijaMarket is a platform where anyone can buy, sell, or earn safely — with escrow protection, proof verification, and structured delivery.

## What is implemented now

This repository now includes a runnable **MVP backend prototype API** covering the first critical commerce flows:

- Listings create/read
- Conversation + chat messages
- Order creation
- Escrow-oriented order state transitions (pay, commit, delivery events, confirm, dispute)

The current implementation uses in-memory storage so we can iterate on behavior quickly before plugging in PostgreSQL and external providers.

## Quick start

### Requirements
- Node.js 20+

### Run locally

```bash
npm start
```

API starts at `http://localhost:3000`.

### Run tests

```bash
npm test
```

## Current API endpoints

### Health
- `GET /health`

### Listings
- `POST /listings`
- `GET /listings`
- `GET /listings/:id`

### Conversations & Chat
- `POST /conversations`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`

### Orders
- `POST /orders`
- `POST /orders/:id/pay`
- `POST /orders/:id/commit`
- `POST /orders/:id/delivery-event`
- `POST /orders/:id/confirm`
- `POST /orders/:id/dispute`

## Product docs

- `docs/mvp-prd.md`: product requirements for phase 1.
- `docs/mvp-architecture.md`: technical architecture and data model.
- `docs/mvp-roadmap.md`: 6-week execution roadmap.

## Suggested next implementation step

- Replace in-memory store with PostgreSQL + Prisma.
- Add authentication + role checks.
- Integrate a payment provider sandbox for escrow hold/release/refund events.
