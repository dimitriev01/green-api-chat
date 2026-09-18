import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ChatMessage } from '../types/message';

interface MessageStore {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      messages: [],

      addMessage: (message) =>
        set((state) => {
          const alreadyExists = state.messages.some(
            (existingMessage) => existingMessage.id === message.id,
          );

          if (alreadyExists) {
            return state;
          }

          return {
            messages: [...state.messages, message],
          };
        }),

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'green-api-messages',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
