# NaijaMarket MVP Architecture

## 1) High-level architecture
- **Web client**: Next.js app for buyer, seller, and lightweight admin.
- **API layer**: REST endpoints with JWT auth and role checks.
- **Realtime service**: WebSocket for chat and order status events.
- **Database**: PostgreSQL as source of truth.
- **Object storage**: media for listing images + proof videos.
- **Payment integration**: provider callbacks for hold/release/refund events.

## 2) Domain model (v1)

### `users`
- `id`, `phone`, `email`, `name`, `role`, `kyc_status`, `created_at`

### `seller_profiles`
- `user_id`, `score`, `badge_tier`, `total_orders`, `on_time_rate`, `dispute_loss_rate`

### `listings`
- `id`, `seller_id`, `title`, `description`, `price_ngn`, `condition`, `location_city`, `status`, `created_at`

### `listing_media`
- `id`, `listing_id`, `type(image|proof_video)`, `url`, `dynamic_code`, `uploaded_at`

### `conversations`
- `id`, `listing_id`, `buyer_id`, `seller_id`, `created_at`

### `messages`
- `id`, `conversation_id`, `sender_id`, `body`, `created_at`

### `orders`
- `id`, `listing_id`, `buyer_id`, `seller_id`, `amount_ngn`, `state`, `commitment_deadline`, `created_at`

### `escrow_transactions`
- `id`, `order_id`, `provider_ref`, `state(held|released|refunded)`, `held_at`, `released_at`, `refunded_at`

### `delivery_events`
- `id`, `order_id`, `actor_id`, `event_type`, `note`, `created_at`

### `disputes`
- `id`, `order_id`, `opened_by`, `reason`, `state`, `resolution_type`, `resolved_at`

## 3) Minimal API surface

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Listings
- `POST /listings`
- `POST /listings/:id/media`
- `GET /listings`
- `GET /listings/:id`

### Chat
- `POST /conversations`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`

### Orders + Escrow
- `POST /orders`
- `POST /orders/:id/pay`
- `POST /orders/:id/commit`
- `POST /orders/:id/delivery-event`
- `POST /orders/:id/confirm`
- `POST /orders/:id/dispute`

### Admin
- `GET /admin/disputes`
- `POST /admin/disputes/:id/resolve`

## 4) Event log requirements
Every state mutation writes an append-only event:
- who acted (`actor_id`)
- what changed (`from_state`, `to_state`)
- when (`timestamp`)
- why (`reason`, optional)

This supports evidence-based dispute decisions.

## 5) Security baseline
- JWT auth + rotating refresh tokens
- Signed upload URLs for media
- Rate limiting for auth and chat abuse
- Audit logs for admin actions
- PII encryption at rest for sensitive user fields

## 6) Suggested first release strategy
1. Build happy-path order completion with escrow simulation sandbox.
2. Add dispute opening + manual admin resolution.
3. Add automated seller score recalculation job.
