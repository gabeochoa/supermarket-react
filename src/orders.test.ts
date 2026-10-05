import { expect, test } from 'vitest';
import { assertValidOrder, makeOrder, topUpOrders } from './orders.ts';

test('past mistake bec818e: amount is never 0', () => {
  expect(makeOrder([0, 1], () => 0).amount).toBe(1);
});
test('past mistake 1026b1a: price is amount*ratio, not amount', () => {
  const o = makeOrder([0], () => 0.5);
  expect(o.price).toBe(o.amount * 6);
  expect(() => assertValidOrder({ ...o, price: o.amount - 1 })).toThrow();
  expect(() => assertValidOrder({ ...o, amount: 0 })).toThrow();
});
test('topUp keeps >=5 valid orders and does not mutate input', () => {
  const input = [makeOrder([0], () => 0)];
  const out = topUpOrders(input, [0, 1], () => 0.2);
  expect(out.length).toBe(5); expect(input.length).toBe(1);
});
