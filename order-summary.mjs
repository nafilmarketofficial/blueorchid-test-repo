export function calculateOrderSummaryCents(itemSubtotalCents, deliveryFeeCents) {
  for (const [label, cents] of [
    ['Item subtotal', itemSubtotalCents],
    ['Delivery fee', deliveryFeeCents],
  ]) {
    if (!Number.isSafeInteger(cents) || cents < 0) {
      throw new RangeError(`${label} must be a nonnegative integer in cents`);
    }
  }

  const totalCents = itemSubtotalCents + deliveryFeeCents;
  if (!Number.isSafeInteger(totalCents)) {
    throw new RangeError('Order total exceeds the safe integer range');
  }

  return { itemSubtotalCents, deliveryFeeCents, totalCents };
}
