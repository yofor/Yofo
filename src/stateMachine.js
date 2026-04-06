const ORDER_STATES = {
  PENDING_PAYMENT: "pending_payment",
  PAID_ESCROW: "paid_escrow",
  SELLER_COMMITTED: "seller_committed",
  IN_TRANSIT: "in_transit",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  DISPUTED: "disputed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded"
};

const ALLOWED_TRANSITIONS = {
  [ORDER_STATES.PENDING_PAYMENT]: [ORDER_STATES.PAID_ESCROW, ORDER_STATES.CANCELLED],
  [ORDER_STATES.PAID_ESCROW]: [ORDER_STATES.SELLER_COMMITTED, ORDER_STATES.REFUNDED],
  [ORDER_STATES.SELLER_COMMITTED]: [ORDER_STATES.IN_TRANSIT, ORDER_STATES.DISPUTED, ORDER_STATES.CANCELLED],
  [ORDER_STATES.IN_TRANSIT]: [ORDER_STATES.DELIVERED, ORDER_STATES.DISPUTED],
  [ORDER_STATES.DELIVERED]: [ORDER_STATES.COMPLETED, ORDER_STATES.DISPUTED],
  [ORDER_STATES.COMPLETED]: [],
  [ORDER_STATES.DISPUTED]: [ORDER_STATES.REFUNDED, ORDER_STATES.COMPLETED],
  [ORDER_STATES.CANCELLED]: [],
  [ORDER_STATES.REFUNDED]: []
};

function canTransition(fromState, toState) {
  return (ALLOWED_TRANSITIONS[fromState] || []).includes(toState);
}

function transitionOrder(order, toState) {
  if (!canTransition(order.state, toState)) {
    throw new Error(`Invalid order transition: ${order.state} -> ${toState}`);
  }

  return {
    ...order,
    state: toState,
    updated_at: new Date().toISOString()
  };
}

module.exports = {
  ORDER_STATES,
  ALLOWED_TRANSITIONS,
  canTransition,
  transitionOrder
};
