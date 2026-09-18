import type { InstanceStateResponse } from '@entities/instance';
import { createApiClient, type GreenApiCredentials } from '@shared/api';

export async function getStateInstance(
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
) {
  const api = createApiClient(credentials);

  const { data } = await api.get<InstanceStateResponse>(
    `/getStateInstance/${credentials.apiTokenInstance}`,
    { signal },
  );

  return data;
}
