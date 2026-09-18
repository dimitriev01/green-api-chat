import { FormEvent, useState } from 'react';
import { useChatStore } from '@entities/chat';
import { useInstanceStore } from '@entities/instance';
import { useMessageStore } from '@entities/message';
import { sendMessage } from '../api/sendMessage';
import styles from './MessageComposer.module.scss';
import { getApiErrorMessage } from '@shared/api';

export function MessageComposer() {
  const credentials = useInstanceStore((state) => state.credentials);
  const activeChat = useChatStore((state) => state.activeChat);
  const addMessage = useMessageStore((state) => state.addMessage);

  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const message = value.trim();
    if (!credentials || !activeChat || !message) return;

    try {
      setError('');
      setIsSending(true);

      const result = await sendMessage(credentials, activeChat.chatId, message);

      addMessage({
        id: result.idMessage,
        text: message,
        direction: 'outgoing',
        timestamp: Date.now(),
      });

      setValue('');
    } catch (error) {
      setError(getApiErrorMessage(error, 'Message was not sent.'));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className={styles.composer} onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Message"
        maxLength={4000}
      />
      <button disabled={isSending || !value.trim()}>
        {isSending ? 'Sending…' : 'Send'}
      </button>
      {error && <span>{error}</span>}
    </form>
  );
}
