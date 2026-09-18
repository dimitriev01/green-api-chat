import { describe, expect, it } from 'vitest';
import { normalizePhoneNumber } from './normalizePhoneNumber';

describe('normalizePhoneNumber', () => {
  it('removes non-digit characters', () => {
    expect(normalizePhoneNumber('+7 (999) 123-45-67')).toBe('79991234567');
  });
});
