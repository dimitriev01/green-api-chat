import { createApiClient, type GreenApiCredentials } from '@shared/api';

type CheckAccountSuccessResponse = {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
};

type CheckAccountErrorResponse = {
  status: false;
  reason: string;
};

export type CheckAccountResponse =
  CheckAccountSuccessResponse | CheckAccountErrorResponse;

export async function checkAccount(
  credentials: GreenApiCredentials,
  phoneNumber: string,
  signal?: AbortSignal,
) {
  const api = createApiClient(credentials);

  const { data } = await api.post<CheckAccountResponse>(
    `/checkAccount/${credentials.apiTokenInstance}`,
    {
      phoneNumber: Number(phoneNumber),
    },
    { signal },
  );

  return data;
}
