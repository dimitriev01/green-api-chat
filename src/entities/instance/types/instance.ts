import type { GreenApiCredentials } from '@shared/api';

export type InstanceCredentials = GreenApiCredentials;

export type InstanceState =
  | 'authorized'
  | 'notAuthorized'
  | 'blocked'
  | 'sleepMode'
  | 'starting'
  | 'suspended';

export interface InstanceStateResponse {
  stateInstance: InstanceState;
}
