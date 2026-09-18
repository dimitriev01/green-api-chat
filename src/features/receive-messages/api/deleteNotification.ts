import { createApiClient, type GreenApiCredentials } from '@shared/api';

export async function deleteNotification(
  credentials: GreenApiCredentials,
  receiptId: number,
  signal?: AbortSignal,
) {
  const api = createApiClient(credentials);

  await api.delete(
    `/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`,
    { signal },
  );
}
