import axios from 'axios';
import type { GreenApiCredentials } from './types';

export function createApiClient(credentials: GreenApiCredentials) {
  return axios.create({
    baseURL: `${credentials.apiUrl}/waInstance${credentials.idInstance}`,
    timeout: 65000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
