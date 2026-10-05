import type { Order } from './DataContext.tsx';

// CORRECT rule: orders are only born here. Past bugs shipped amount=0
// (bec818e "not 0 amount pls") and price==amount (1026b1a UI showed
// "{amount} for {amount}$"). Invariants are enforced, not remembered.
export const MIN_ORDERS = 5;
export function makeOrder(
  itemIds: Array<number>,
  rng: () => number = Math.random,
): Order {
  if (itemIds.length === 0) {
    throw new Error('makeOrder: no items to order');
  }
  const amount = 1 + Math.floor(rng() * 10); // >=1, never 0
  const ratio = 1 + Math.floor(rng() * 10); // price per unit >=1
  const item_id = itemIds[Math.floor(rng() * itemIds.length)];
  return {
    amount,
    indicate: false,
    item_id,
    pctRemaining: 100,
    price: amount * ratio,
  };
}
export function assertValidOrder(o: Order): void {
  if (!Number.isInteger(o.amount) || o.amount < 1) {
    throw new Error(`order amount must be >=1, got ${o.amount}`);
  }
  if (o.price < o.amount) {
    throw new Error(`order price ${o.price} < amount ${o.amount} (ratio <1)`);
  }
  if (o.pctRemaining <= 0 || o.pctRemaining > 100) {
    throw new Error(`pctRemaining out of (0,100]: ${o.pctRemaining}`);
  }
}
export function topUpOrders(
  orders: Array<Order>,
  itemIds: Array<number>,
  rng?: () => number,
): Array<Order> {
  const next = [...orders];
  while (next.length < MIN_ORDERS) {
    next.push(makeOrder(itemIds, rng));
  }
  next.forEach(assertValidOrder);
  return next;
}
