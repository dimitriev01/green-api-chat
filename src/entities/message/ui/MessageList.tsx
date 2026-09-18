import { useEffect, useRef } from 'react';
import { useMessageStore } from '../model/messageStore';
import styles from './MessageList.module.scss';

export function MessageList() {
  const messages = useMessageStore((state) => state.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages.length]);

  return (
    <div className={styles.list}>
      {messages.length === 0 ? (
        <div className={styles.empty}>No messages yet</div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.row} ${
              message.direction === 'outgoing'
                ? styles.outgoing
                : styles.incoming
            }`}
          >
            <div className={styles.bubble}>
              <div>{message.text}</div>

              <time>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>
        ))
      )}

      <div ref={bottomRef} />
    </div>
  );
}
