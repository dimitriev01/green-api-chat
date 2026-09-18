import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { InstanceCredentials } from '../types/instance';

interface InstanceStore {
  credentials: InstanceCredentials | null;
  setCredentials: (credentials: InstanceCredentials) => void;
  clearCredentials: () => void;
}

export const useInstanceStore = create<InstanceStore>()(
  persist(
    (set) => ({
      credentials: null,
      setCredentials: (credentials) => set({ credentials }),
      clearCredentials: () => set({ credentials: null }),
    }),
    {
      name: 'green-api-instance',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
