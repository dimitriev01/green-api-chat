import { useEffect } from 'react';
import { useChatStore } from '@entities/chat';
import { useInstanceStore } from '@entities/instance';
import { useMessageStore } from '@entities/message';
import { deleteNotification } from '../api/deleteNotification';
import { receiveNotification } from '../api/receiveNotification';
import { parseIncomingTextMessage } from './parseIncomingTextMessage';

export function useReceiveMessages() {
  const credentials = useInstanceStore((state) => state.credentials);
  const activeChat = useChatStore((state) => state.activeChat);
  const addMessage = useMessageStore((state) => state.addMessage);

  useEffect(() => {
    if (!credentials || !activeChat) {
      return;
    }

    const currentCredentials = credentials;
    const currentChat = activeChat;

    const controller = new AbortController();
    let stopped = false;

    async function poll() {
      while (!stopped && !controller.signal.aborted) {
        try {
          const notification = await receiveNotification(
            currentCredentials,
            controller.signal,
          );

          if (!notification) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }

          const message = parseIncomingTextMessage(
            notification,
            currentChat.chatId,
          );

          if (message) {
            addMessage(message);
          }

          await deleteNotification(
            currentCredentials,
            notification.receiptId,
            controller.signal,
          );
        } catch {
          if (controller.signal.aborted) {
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }
    }

    void poll();

    return () => {
      stopped = true;
      controller.abort();
    };
  }, [credentials, activeChat, addMessage]);
}
