const http = require("http");
const { URL } = require("url");
const { db, createListing, createConversation, addMessage, createOrder } = require("./store");
const { ORDER_STATES, transitionOrder } = require("./stateMachine");

const PORT = process.env.PORT || 3000;

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }
  if (!raw) return {};
  return JSON.parse(raw);
}

function notFound(res) {
  sendJson(res, 404, { error: "Not found" });
}

function badRequest(res, message) {
  sendJson(res, 400, { error: message });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (req.method === "GET" && path === "/health") {
      return sendJson(res, 200, { status: "ok" });
    }

    if (req.method === "POST" && path === "/listings") {
      const body = await readJson(req);
      if (!body.seller_id || !body.title || typeof body.price_ngn !== "number") {
        return badRequest(res, "seller_id, title, and numeric price_ngn are required");
      }
      return sendJson(res, 201, createListing(body));
    }

    if (req.method === "GET" && path === "/listings") {
      return sendJson(res, 200, db.listings);
    }

    if (req.method === "GET" && path.startsWith("/listings/")) {
      const listingId = path.split("/")[2];
      const listing = db.listings.find((item) => item.id === listingId);
      if (!listing) return notFound(res);
      return sendJson(res, 200, listing);
    }

    if (req.method === "POST" && path === "/conversations") {
      const body = await readJson(req);
      if (!body.listing_id || !body.buyer_id || !body.seller_id) {
        return badRequest(res, "listing_id, buyer_id, and seller_id are required");
      }
      return sendJson(res, 201, createConversation(body));
    }

    if (req.method === "GET" && path.match(/^\/conversations\/[^/]+\/messages$/)) {
      const conversationId = path.split("/")[2];
      const convo = db.conversations.find((item) => item.id === conversationId);
      if (!convo) return notFound(res);
      return sendJson(res, 200, convo.messages);
    }

    if (req.method === "POST" && path.match(/^\/conversations\/[^/]+\/messages$/)) {
      const conversationId = path.split("/")[2];
      const body = await readJson(req);
      if (!body.sender_id || !body.body) {
        return badRequest(res, "sender_id and body are required");
      }
      const message = addMessage(conversationId, body);
      if (!message) return notFound(res);
      return sendJson(res, 201, message);
    }

    if (req.method === "POST" && path === "/orders") {
      const body = await readJson(req);
      if (!body.listing_id || !body.buyer_id || !body.seller_id || typeof body.amount_ngn !== "number") {
        return badRequest(res, "listing_id, buyer_id, seller_id, and numeric amount_ngn are required");
      }
      return sendJson(res, 201, createOrder(body));
    }

    if (req.method === "POST" && path.match(/^\/orders\/[^/]+\/pay$/)) {
      const orderId = path.split("/")[2];
      const order = db.orders.find((item) => item.id === orderId);
      if (!order) return notFound(res);
      Object.assign(order, transitionOrder(order, ORDER_STATES.PAID_ESCROW));
      return sendJson(res, 200, order);
    }

    if (req.method === "POST" && path.match(/^\/orders\/[^/]+\/commit$/)) {
      const orderId = path.split("/")[2];
      const order = db.orders.find((item) => item.id === orderId);
      if (!order) return notFound(res);
      Object.assign(order, transitionOrder(order, ORDER_STATES.SELLER_COMMITTED));
      return sendJson(res, 200, order);
    }

    if (req.method === "POST" && path.match(/^\/orders\/[^/]+\/delivery-event$/)) {
      const orderId = path.split("/")[2];
      const order = db.orders.find((item) => item.id === orderId);
      if (!order) return notFound(res);
      const body = await readJson(req);

      if (order.state === ORDER_STATES.SELLER_COMMITTED) {
        Object.assign(order, transitionOrder(order, ORDER_STATES.IN_TRANSIT));
      }

      const event = {
        id: `evt_${Date.now()}`,
        actor_id: body.actor_id || "system",
        event_type: body.event_type || "update",
        note: body.note || "",
        created_at: new Date().toISOString()
      };

      order.delivery_events.push(event);
      return sendJson(res, 201, { order, event });
    }

    if (req.method === "POST" && path.match(/^\/orders\/[^/]+\/confirm$/)) {
      const orderId = path.split("/")[2];
      const order = db.orders.find((item) => item.id === orderId);
      if (!order) return notFound(res);
      if (order.state === ORDER_STATES.IN_TRANSIT) {
        Object.assign(order, transitionOrder(order, ORDER_STATES.DELIVERED));
      }
      Object.assign(order, transitionOrder(order, ORDER_STATES.COMPLETED));
      return sendJson(res, 200, order);
    }

    if (req.method === "POST" && path.match(/^\/orders\/[^/]+\/dispute$/)) {
      const orderId = path.split("/")[2];
      const order = db.orders.find((item) => item.id === orderId);
      if (!order) return notFound(res);
      Object.assign(order, transitionOrder(order, ORDER_STATES.DISPUTED));
      return sendJson(res, 200, order);
    }

    return notFound(res);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return badRequest(res, "Invalid JSON payload");
    }

    if (error instanceof Error && error.message.startsWith("Invalid order transition")) {
      return badRequest(res, error.message);
    }

    return sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`NaijaMarket MVP API running on http://localhost:${PORT}`);
});
