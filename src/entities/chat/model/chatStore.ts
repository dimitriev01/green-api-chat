import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ActiveChat } from '../types/chat';

interface ChatStore {
  activeChat: ActiveChat | null;
  setActiveChat: (chat: ActiveChat) => void;
  clearActiveChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      activeChat: null,
      setActiveChat: (chat) => set({ activeChat: chat }),
      clearActiveChat: () => set({ activeChat: null }),
    }),
    {
      name: 'green-api-chat',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
