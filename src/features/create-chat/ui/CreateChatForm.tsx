import { FormEvent, useState } from 'react';
import { useChatStore } from '@entities/chat';
import { useInstanceStore } from '@entities/instance';
import { useMessageStore } from '@entities/message';
import { normalizePhoneNumber } from '@shared/lib';
import { checkAccount } from '../api/checkAccount';
import styles from './CreateChatForm.module.scss';
import { getApiErrorMessage } from '@shared/api';

export function CreateChatForm() {
  const credentials = useInstanceStore((state) => state.credentials);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const clearMessages = useMessageStore((state) => state.clearMessages);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!credentials) return;

    const phoneNumber = normalizePhoneNumber(phone);
    setError('');

    if (!/^\d{11,12}$/.test(phoneNumber)) {
      setError('Enter a valid phone number with 11 or 12 digits.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await checkAccount(credentials, phoneNumber);

      if ('status' in result) {
        setError(result.reason);
        return;
      }

      if (!result.exist || !result.chatId) {
        setError('MAX account was not found for this phone number.');
        return;
      }

      clearMessages();
      setActiveChat({ phoneNumber, chatId: result.chatId });
    } catch (error) {
      setError(getApiErrorMessage(error, 'Unable to check recipient account.'));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="+7 999 123-45-67"
      />
      <button disabled={isLoading}>
        {isLoading ? 'Checking…' : 'Create chat'}
      </button>
      {error && <span>{error}</span>}
    </form>
  );
}
