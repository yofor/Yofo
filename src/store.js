const { ORDER_STATES } = require("./stateMachine");

const db = {
  listings: [],
  conversations: [],
  orders: [],
  order_events: []
};

function createId(prefix) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now()}_${random}`;
}

function createListing(payload) {
  const listing = {
    id: createId("lst"),
    seller_id: payload.seller_id,
    title: payload.title,
    description: payload.description || "",
    price_ngn: payload.price_ngn,
    condition: payload.condition || "used",
    location_city: payload.location_city || "unknown",
    proof_video_url: payload.proof_video_url || null,
    proof_dynamic_code: payload.proof_dynamic_code || null,
    status: "published",
    created_at: new Date().toISOString()
  };

  db.listings.push(listing);
  return listing;
}

function createConversation(payload) {
  const conversation = {
    id: createId("convo"),
    listing_id: payload.listing_id,
    buyer_id: payload.buyer_id,
    seller_id: payload.seller_id,
    messages: [],
    created_at: new Date().toISOString()
  };

  db.conversations.push(conversation);
  return conversation;
}

function addMessage(conversationId, payload) {
  const convo = db.conversations.find((item) => item.id === conversationId);
  if (!convo) return null;

  const message = {
    id: createId("msg"),
    sender_id: payload.sender_id,
    body: payload.body,
    created_at: new Date().toISOString()
  };

  convo.messages.push(message);
  return message;
}

function createOrder(payload) {
  const order = {
    id: createId("ord"),
    listing_id: payload.listing_id,
    buyer_id: payload.buyer_id,
    seller_id: payload.seller_id,
    amount_ngn: payload.amount_ngn,
    state: ORDER_STATES.PENDING_PAYMENT,
    commitment_deadline: payload.commitment_deadline || null,
    delivery_events: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.orders.push(order);
  return order;
}

function logOrderEvent(order, toState, actor_id, reason) {
  const event = {
    id: createId("oev"),
    order_id: order.id,
    actor_id,
    from_state: order.state,
    to_state: toState,
    reason: reason || null,
    created_at: new Date().toISOString()
  };

  db.order_events.push(event);
  return event;
}

function getSellerScore(sellerId) {
  const sellerOrders = db.orders.filter((order) => order.seller_id === sellerId);
  if (sellerOrders.length === 0) {
    return {
      seller_id: sellerId,
      total_orders: 0,
      completion_rate: 0,
      dispute_ratio: 0,
      reliability_score: 0,
      badge_tier: "Bronze"
    };
  }

  const completedCount = sellerOrders.filter((order) => order.state === ORDER_STATES.COMPLETED).length;
  const disputedCount = sellerOrders.filter((order) => order.state === ORDER_STATES.DISPUTED).length;

  const completionRate = completedCount / sellerOrders.length;
  const disputeRatio = disputedCount / sellerOrders.length;
  const reliabilityScore = Math.max(0, Math.round((completionRate * 100) - (disputeRatio * 40)));

  const badgeTier = reliabilityScore >= 85 ? "Gold" : reliabilityScore >= 60 ? "Silver" : "Bronze";

  return {
    seller_id: sellerId,
    total_orders: sellerOrders.length,
    completion_rate: Number(completionRate.toFixed(2)),
    dispute_ratio: Number(disputeRatio.toFixed(2)),
    reliability_score: reliabilityScore,
    badge_tier: badgeTier
  };
}

function resetDb() {
  db.listings = [];
  db.conversations = [];
  db.orders = [];
  db.order_events = [];
}

module.exports = {
  db,
  createListing,
  createConversation,
  addMessage,
  createOrder,
  logOrderEvent,
  getSellerScore,
  resetDb
};
