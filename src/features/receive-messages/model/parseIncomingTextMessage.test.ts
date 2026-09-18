import { describe, expect, it } from 'vitest';
import { parseIncomingTextMessage } from './parseIncomingTextMessage';

describe('parseIncomingTextMessage', () => {
  it('parses incoming text message for active chat', () => {
    const result = parseIncomingTextMessage(
      {
        receiptId: 123,
        body: {
          typeWebhook: 'incomingMessageReceived',
          timestamp: 1700000000,
          idMessage: 'message-id',
          senderData: {
            chatId: '10000000',
          },
          messageData: {
            typeMessage: 'textMessage',
            textMessageData: {
              textMessage: 'Hello',
            },
          },
        },
      },
      '10000000',
    );

    expect(result).toEqual({
      id: 'message-id',
      text: 'Hello',
      direction: 'incoming',
      timestamp: 1700000000000,
    });
  });

  it('ignores messages from another chat', () => {
    const result = parseIncomingTextMessage(
      {
        receiptId: 123,
        body: {
          typeWebhook: 'incomingMessageReceived',
          senderData: {
            chatId: 'another-chat',
          },
          messageData: {
            typeMessage: 'textMessage',
            textMessageData: {
              textMessage: 'Hello',
            },
          },
        },
      },
      '10000000',
    );

    expect(result).toBeNull();
  });

  it('ignores non-text notifications', () => {
    const result = parseIncomingTextMessage(
      {
        receiptId: 123,
        body: {
          typeWebhook: 'outgoingMessageStatus',
        },
      },
      '10000000',
    );

    expect(result).toBeNull();
  });
});
