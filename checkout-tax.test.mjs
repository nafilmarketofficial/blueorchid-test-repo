import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePerLineTaxCents } from './checkout-tax.mjs';

test('rounds half-cent tax on each line before summing', () => {
  assert.equal(calculatePerLineTaxCents([5, 5], 1000), 2);
  assert.equal(calculatePerLineTaxCents([10], 1000), 1);
});

test('rounds fractions below half a cent down on each line', () => {
  assert.equal(calculatePerLineTaxCents([6, 6], 750), 0);
  assert.equal(calculatePerLineTaxCents([], 750), 0);
});
