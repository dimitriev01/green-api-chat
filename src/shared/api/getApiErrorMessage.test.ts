import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getApiErrorMessage } from './getApiErrorMessage';

describe('getApiErrorMessage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns API message when response contains message', () => {
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const error = {
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    };

    expect(getApiErrorMessage(error, 'Fallback error')).toBe(
      'Invalid credentials',
    );
  });

  it('returns API reason when response contains reason', () => {
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    const error = {
      response: {
        data: {
          reason: 'Instance is not authorized',
        },
      },
    };

    expect(getApiErrorMessage(error, 'Fallback error')).toBe(
      'Instance is not authorized',
    );
  });

  it('returns fallback for non-Axios errors', () => {
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

    expect(
      getApiErrorMessage(new Error('Unknown error'), 'Fallback error'),
    ).toBe('Fallback error');
  });
});
