# NaijaMarket MVP PRD

## 1) Problem statement
Online P2P buying and selling in Nigeria is high-volume but low-trust. Buyers face scams, sellers face unreliable buyers, and existing channels lack enforceable safety rails.

## 2) MVP objective
Deliver a web MVP that makes first transactions materially safer through:

1. Listing authenticity checks
2. Escrow-based payment controls
3. Structured delivery + proof tracking
4. Evidence-backed dispute decisions

## 3) Target users

### Primary: Hustler sellers
- Students and side-income seekers
- Individuals without inventory looking to source and fulfill quickly

### Secondary: Trust-sensitive buyers
- Frequent online buyers burned by prior scams
- Users preferring protected payment release

## 4) Jobs-to-be-done
- As a buyer, I want to verify a seller has real access to the product before paying.
- As a buyer, I want my payment protected until I receive what was promised.
- As a seller, I want transparent order steps so I can get paid quickly when I perform.
- As an operator, I want logs/evidence to resolve disputes consistently.

## 5) In-scope features (MVP)

### A. Listings + proof-of-access
- Seller creates listing with title, price, location, condition, images.
- Seller uploads short proof video showing product and dynamic code token.
- Listing state: `draft`, `published`, `flagged`, `archived`.

### B. In-app chat
- Buyer and seller can exchange messages on a listing thread.
- System persists timestamps and sender IDs for dispute evidence.

### C. Escrow checkout
- Buyer places order and pays platform.
- Funds held in `escrow_held` state.
- Funds released only after buyer confirms delivery (or dispute resolution).

### D. Structured order flow
- States: `pending_payment` → `paid_escrow` → `seller_committed` → `in_transit` → `delivered` → `completed`.
- Exception states: `cancelled`, `disputed`, `refunded`.

### E. Delivery tracking (manual ops)
- Rider/partner details can be attached to order.
- Status updates logged with actor + timestamp.

### F. Seller score v1
- Score derived from completion rate, on-time commitment, dispute ratio.
- Visible badge tiers: Bronze / Silver / Gold.

## 6) Out-of-scope (for MVP)
- AI moderation/scoring
- Native mobile apps
- Automated logistics integrations
- Affiliate engine
- Service/rental verticals

## 7) Safety policies (hard rules)
- No off-platform payment instructions in chat.
- Missed seller commitment windows trigger warnings and score penalty.
- Repeated dispute loss or delivery no-shows lead to suspension review.

## 8) Success metrics (first 90 days)
- Escrow adoption rate: >85% of orders completed via escrow
- Dispute rate: <8% of paid orders
- Successful completion rate: >75%
- First-order repeat buy rate (30-day): >25%
- Median dispute resolution time: <48 hours

## 9) Core user flows

### Buyer flow
Browse listing → inspect proof video → chat seller → place order/pay escrow → track delivery → confirm receipt or open dispute.

### Seller flow
Create listing/proof → respond in chat → accept order and commit timeline → hand over for delivery → receive payout after completion.

### Admin flow
Review flagged listings/chats → inspect evidence pack → decide dispute (release/refund/split) → enforce penalties.

## 10) Open decisions to finalize
1. Exact provider/implementation model for escrow releases.
2. SLA window defaults by city tier (Lagos/Abuja/P-Harcourt vs rest).
3. KYC threshold for sellers before higher-volume transactions.
