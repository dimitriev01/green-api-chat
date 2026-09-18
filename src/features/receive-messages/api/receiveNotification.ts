import { createApiClient, type GreenApiCredentials } from '@shared/api';

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: unknown;
}

export async function receiveNotification(
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
) {
  const api = createApiClient(credentials);

  const { data } = await api.get<ReceiveNotificationResponse | null>(
    `/receiveNotification/${credentials.apiTokenInstance}`,
    {
      params: {
        receiveTimeout: 20,
      },
      signal,
    },
  );

  return data;
}
