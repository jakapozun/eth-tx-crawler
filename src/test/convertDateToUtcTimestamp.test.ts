import { describe, it, expect } from 'vitest';
import { convertDateToUtcTimestamp } from '../utils/helpers.ts';

describe('convertDateToUtcTimestamp', () => {
  it('returns empty string when date is empty', () => {
    const res = convertDateToUtcTimestamp('');
    expect(res).toBe('');
  });

  it('converts a valid date to correct UTC timestamp (midnight UTC)', () => {
    const input = '2025-06-06';
    const result = convertDateToUtcTimestamp(input);

    //should be midnight UTC (00:00:00) - checked result with: https://www.unixtimestamp.com/
    expect(result).toBe('1749168000');
  });

  it('should handle invalid date correctly - return emprty string', () => {
    const input = 'invalid-date';
    const result = convertDateToUtcTimestamp(input);
    expect(result).toBe('');
  });

  it('should handle current date (now) correctly and return valid timestamp', () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // convert to correct string format 'YYYY-MM-DD'
    const result = convertDateToUtcTimestamp(formattedDate);

    const expectedTimestamp = Math.floor(
      currentDate.setUTCHours(0, 0, 0, 0) / 1000
    ).toString();
    expect(result).toBe(expectedTimestamp);
  });
});
