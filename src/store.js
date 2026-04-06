const { ORDER_STATES } = require("./stateMachine");

const db = {
  listings: [],
  conversations: [],
  orders: []
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

module.exports = {
  db,
  createListing,
  createConversation,
  addMessage,
  createOrder
};
