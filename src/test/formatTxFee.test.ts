import { describe, it, expect } from 'vitest';
import { formatTxFee } from '../utils/helpers.ts';

const gasPrice20 = '20000000000';
const gasPrice50 = '50000000000';
const gasUsedLarge = '1000000';

describe('formatTxFee', () => {
  it('returns 0 when gasUsed is 0', () => {
    const res = formatTxFee(gasPrice20, '0');
    expect(res).toBe('0.0');
  });

  it('returns correct fee for 50 wei gas price and 1000000 gas used, and returns correctly formatted value', () => {
    const res = formatTxFee(gasPrice50, gasUsedLarge);
    expect(res).toBe('0.05');
  });

  it('returns Invalid Fee when inputs are not valid numbers', () => {
    const res = formatTxFee('test123', 'f87932ubnfe');
    expect(res).toBe('Invalid Fee');
  });
});
