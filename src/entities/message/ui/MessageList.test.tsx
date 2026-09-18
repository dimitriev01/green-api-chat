// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { useMessageStore } from '../model/messageStore';
import { MessageList } from './MessageList';

describe('MessageList', () => {
  beforeEach(() => {
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      value: vi.fn(),
      writable: true,
    });

    useMessageStore.setState({
      messages: [],
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders empty state when there are no messages', () => {
    render(<MessageList />);

    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  it('renders messages from the store', () => {
    useMessageStore.setState({
      messages: [
        {
          id: '1',
          text: 'Hello MAX',
          direction: 'incoming',
          timestamp: Date.now(),
        },
      ],
    });

    render(<MessageList />);

    expect(screen.getByText('Hello MAX')).toBeInTheDocument();
  });
});
