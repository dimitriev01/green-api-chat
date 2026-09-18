import type { ChatMessage } from '@entities/message';
import type { ReceiveNotificationResponse } from '../api/receiveNotification';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

export function parseIncomingTextMessage(
  notification: ReceiveNotificationResponse,
  activeChatId: string,
): ChatMessage | null {
  const body = notification.body;

  if (!isRecord(body)) {
    return null;
  }

  if (body.typeWebhook !== 'incomingMessageReceived') {
    return null;
  }

  const senderData = body.senderData;

  if (!isRecord(senderData) || senderData.chatId !== activeChatId) {
    return null;
  }

  const messageData = body.messageData;

  if (!isRecord(messageData) || messageData.typeMessage !== 'textMessage') {
    return null;
  }

  const textMessageData = messageData.textMessageData;

  if (!isRecord(textMessageData)) {
    return null;
  }

  const text =
    typeof textMessageData.textMessage === 'string'
      ? textMessageData.textMessage.trim()
      : '';

  if (!text) {
    return null;
  }

  const timestamp =
    typeof body.timestamp === 'number' ? body.timestamp * 1000 : Date.now();

  const id =
    typeof body.idMessage === 'string' && body.idMessage
      ? body.idMessage
      : `incoming-${notification.receiptId}-${timestamp}`;

  return {
    id,
    text,
    direction: 'incoming',
    timestamp,
  };
}
