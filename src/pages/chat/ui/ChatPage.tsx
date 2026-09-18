import { useChatStore } from '@entities/chat';
import { MessageList } from '@entities/message';
import { CreateChatForm } from '@features/create-chat';
import { LogoutButton } from '@features/logout';
import { useReceiveMessages } from '@features/receive-messages';
import { MessageComposer } from '@features/send-message';
import styles from './ChatPage.module.scss';

export function ChatPage() {
  const activeChat = useChatStore((state) => state.activeChat);

  useReceiveMessages();

  return (
    <main className={styles.page}>
      <section className={styles.app}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <div className={styles.logo}>M</div>

            <div>
              <strong>MAX Chat</strong>
              <span>GREEN-API</span>
            </div>
          </div>

          <div className={styles.sidebarTitle}>Chats</div>

          <div className={styles.chatList}>
            {activeChat ? (
              <div className={styles.chatItem}>
                <div className={styles.avatar}>
                  {activeChat.phoneNumber.slice(-2)}
                </div>

                <div className={styles.chatInfo}>
                  <strong>+{activeChat.phoneNumber}</strong>
                  <span>MAX</span>
                </div>
              </div>
            ) : (
              <div className={styles.sidebarEmpty}>No chats yet</div>
            )}
          </div>

          <div className={styles.logout}>
            <LogoutButton />
          </div>
        </aside>

        <section className={styles.content}>
          {!activeChat ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>M</div>

              <h1>Start a new chat</h1>

              <p>Enter the phone number of a MAX user to start messaging.</p>

              <CreateChatForm />
            </div>
          ) : (
            <>
              <header className={styles.chatHeader}>
                <div className={styles.avatar}>
                  {activeChat.phoneNumber.slice(-2)}
                </div>

                <div>
                  <strong>+{activeChat.phoneNumber}</strong>
                  <span>MAX</span>
                </div>
              </header>

              <MessageList />
              <MessageComposer />
            </>
          )}
        </section>
      </section>
    </main>
  );
}
