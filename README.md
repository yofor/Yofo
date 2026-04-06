# NaijaMarket MVP

NaijaMarket is a trust-first P2P commerce platform for Nigeria focused on safe transactions and income generation.

## One-line pitch

> NaijaMarket is a platform where anyone can buy, sell, or earn safely — with escrow protection, proof verification, and structured delivery.

## MVP focus

- Listings with proof-of-access (video + dynamic code)
- Buyer-seller chat
- Escrow checkout flow
- Order lifecycle management
- Manual delivery tracking
- Seller reliability scoring

## Repo contents

- `docs/mvp-prd.md`: product requirements for phase 1.
- `docs/mvp-architecture.md`: technical architecture and data model.
- `docs/mvp-roadmap.md`: 6-week execution roadmap.

## Recommended first build stack

- **Frontend**: Next.js + TypeScript + Tailwind
- **Backend**: NestJS (or Next API routes for fast start)
- **Database**: PostgreSQL + Prisma
- **Realtime chat**: WebSocket (Socket.IO)
- **Storage**: S3-compatible bucket for media uploads
- **Payments/Escrow rail**: Flutterwave or Paystack (escrow-style hold/release workflow)

