import { useChatStore } from '@entities/chat';
import { useInstanceStore } from '@entities/instance';
import { useMessageStore } from '@entities/message';

export function LogoutButton() {
  const clearCredentials = useInstanceStore((state) => state.clearCredentials);
  const clearActiveChat = useChatStore((state) => state.clearActiveChat);
  const clearMessages = useMessageStore((state) => state.clearMessages);

  function handleLogout() {
    clearMessages();
    clearActiveChat();
    clearCredentials();
  }

  return <button onClick={handleLogout}>Logout</button>;
}
