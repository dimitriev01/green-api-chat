import axios from 'axios';

type ApiErrorPayload = {
  message?: string;
  reason?: string;
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const data = error.response?.data as ApiErrorPayload | undefined;

  return data?.message ?? data?.reason ?? fallback;
}
