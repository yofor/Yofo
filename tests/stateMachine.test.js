const test = require("node:test");
const assert = require("node:assert/strict");
const { ORDER_STATES, canTransition, transitionOrder } = require("../src/stateMachine");

test("allows happy-path transitions", () => {
  assert.equal(canTransition(ORDER_STATES.PENDING_PAYMENT, ORDER_STATES.PAID_ESCROW), true);
  assert.equal(canTransition(ORDER_STATES.PAID_ESCROW, ORDER_STATES.SELLER_COMMITTED), true);
  assert.equal(canTransition(ORDER_STATES.IN_TRANSIT, ORDER_STATES.DELIVERED), true);
  assert.equal(canTransition(ORDER_STATES.DELIVERED, ORDER_STATES.COMPLETED), true);
});

test("blocks invalid transitions", () => {
  assert.equal(canTransition(ORDER_STATES.PENDING_PAYMENT, ORDER_STATES.COMPLETED), false);
  assert.equal(canTransition(ORDER_STATES.COMPLETED, ORDER_STATES.IN_TRANSIT), false);
});

test("transitionOrder throws on invalid state changes", () => {
  const order = { id: "ord_1", state: ORDER_STATES.PENDING_PAYMENT };
  assert.throws(() => transitionOrder(order, ORDER_STATES.COMPLETED), /Invalid order transition/);
});
