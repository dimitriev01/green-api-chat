import { useInstanceStore } from '@entities/instance';
import { AuthPage } from '@pages/auth';
import { ChatPage } from '@pages/chat';

export function App() {
  const credentials = useInstanceStore((state) => state.credentials);

  return credentials ? <ChatPage /> : <AuthPage />;
}
