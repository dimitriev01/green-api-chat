import { create } from 'zustand';
import type { ActiveChat } from '../types/chat';

interface ChatStore {
  activeChat: ActiveChat | null;
  setActiveChat: (chat: ActiveChat) => void;
  clearActiveChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChat: null,
  setActiveChat: (activeChat) => set({ activeChat }),
  clearActiveChat: () => set({ activeChat: null }),
}));
