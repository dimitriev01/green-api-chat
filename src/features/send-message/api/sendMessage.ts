import { createApiClient, type GreenApiCredentials } from '@shared/api';

interface SendMessageResponse {
  idMessage: string;
}

export async function sendMessage(
  credentials: GreenApiCredentials,
  chatId: string,
  message: string,
  signal?: AbortSignal,
) {
  const api = createApiClient(credentials);

  const { data } = await api.post<SendMessageResponse>(
    `/sendMessage/${credentials.apiTokenInstance}`,
    { chatId, message },
    { signal },
  );

  return data;
}
