const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("../src/server");
const { resetDb } = require("../src/store");

async function bootServer() {
  resetDb();
  const server = createServer();

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  return {
    baseUrl,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

test("listing requires proof fields", async () => {
  const app = await bootServer();

  const response = await fetch(`${app.baseUrl}/listings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      seller_id: "seller_1",
      title: "iPhone 14",
      price_ngn: 500000
    })
  });

  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.match(payload.error, /proof_video_url and proof_dynamic_code/);

  await app.close();
});

test("order flow creates auditable events and score output", async () => {
  const app = await bootServer();

  const listingResponse = await fetch(`${app.baseUrl}/listings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      seller_id: "seller_1",
      title: "Samsung S24",
      price_ngn: 700000,
      proof_video_url: "https://cdn.example.com/proof.mp4",
      proof_dynamic_code: "NM-8891"
    })
  });
  const listing = await listingResponse.json();

  const orderResponse = await fetch(`${app.baseUrl}/orders`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      listing_id: listing.id,
      buyer_id: "buyer_1",
      seller_id: "seller_1",
      amount_ngn: 700000
    })
  });
  const order = await orderResponse.json();

  await fetch(`${app.baseUrl}/orders/${order.id}/pay`, { method: "POST" });
  await fetch(`${app.baseUrl}/orders/${order.id}/commit`, { method: "POST" });
  await fetch(`${app.baseUrl}/orders/${order.id}/delivery-event`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ actor_id: "rider_1", event_type: "pickup" })
  });
  await fetch(`${app.baseUrl}/orders/${order.id}/confirm`, { method: "POST" });

  const eventsResponse = await fetch(`${app.baseUrl}/orders/${order.id}/events`);
  assert.equal(eventsResponse.status, 200);
  const events = await eventsResponse.json();
  assert.ok(events.length >= 4);

  const scoreResponse = await fetch(`${app.baseUrl}/sellers/seller_1/score`);
  assert.equal(scoreResponse.status, 200);
  const score = await scoreResponse.json();
  assert.equal(score.seller_id, "seller_1");
  assert.equal(score.total_orders, 1);
  assert.equal(score.badge_tier, "Gold");

  await app.close();
});
