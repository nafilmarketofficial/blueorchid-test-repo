// Each subtotal is the extended price of one checkout line, in cents.
// The rate is in basis points (750 = 7.5%). Round half a cent up.
export function calculatePerLineTaxCents(lineSubtotalsCents, rateBasisPoints) {
  if (!Number.isSafeInteger(rateBasisPoints) || rateBasisPoints < 0) {
    throw new RangeError('Tax rate must be a nonnegative integer in basis points');
  }
  let total = 0n;
  for (const cents of lineSubtotalsCents) {
    if (!Number.isSafeInteger(cents) || cents < 0) {
      throw new RangeError('Each line subtotal must be a nonnegative integer in cents');
    }
    total += (BigInt(cents) * BigInt(rateBasisPoints) + 5000n) / 10000n;
  }
  if (total > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('Tax total exceeds the safe integer range');
  }
  return Number(total);
}
