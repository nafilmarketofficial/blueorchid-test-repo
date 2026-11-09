import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateOrderSummaryCents } from './order-summary.mjs';

test('includes the delivery fee in the order total', () => {
  assert.deepEqual(calculateOrderSummaryCents(2500, 500), {
    itemSubtotalCents: 2500,
    deliveryFeeCents: 500,
    totalCents: 3000,
  });
});

test('allows an order with no delivery fee', () => {
  assert.deepEqual(calculateOrderSummaryCents(2500, 0), {
    itemSubtotalCents: 2500,
    deliveryFeeCents: 0,
    totalCents: 2500,
  });
});

test('rejects invalid amounts and totals outside the safe integer range', () => {
  assert.throws(() => calculateOrderSummaryCents(-1, 100), RangeError);
  assert.throws(() => calculateOrderSummaryCents(100, 1.5), RangeError);
  assert.throws(
    () => calculateOrderSummaryCents(Number.MAX_SAFE_INTEGER, 1),
    RangeError,
  );
});
