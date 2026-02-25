'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageSquareDashed, AlertCircle } from 'lucide-react';
import type { Message } from 'ai';
import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  error?: Error;
}

export function MessageList({ messages, isLoading, error }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-5 gap-3">
        <div className="flex flex-col items-center">
          <MessageSquareDashed className="w-8 h-8 text-[#E0E0E0] mb-3" />
          <p className="text-sm text-[#BDBDBD] text-center max-w-[200px]">
            Select a prompt from the library or type below
          </p>
        </div>
        {error && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg w-full max-w-xs"
            style={{ backgroundColor: '#FFF5F5', border: '1px solid #FFCDD2' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E5376B' }} />
            <p className="text-xs" style={{ color: '#992A5C' }}>
              {error.message || 'Something went wrong. Please try again.'}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 chat-scroll">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => {
          if (message.role === 'user') {
            return (
              <UserMessage
                key={message.id}
                content={message.content}
                timestamp={message.createdAt ? new Date(message.createdAt) : undefined}
              />
            );
          }
          if (message.role === 'assistant') {
            return (
              <AssistantMessage
                key={message.id}
                content={message.content}
                timestamp={message.createdAt ? new Date(message.createdAt) : undefined}
              />
            );
          }
          return null;
        })}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <AssistantMessage key="typing" content="" isStreaming />
        )}
        {error && !isLoading && (
          <div
            key="error"
            className="flex items-start gap-2 mb-3 p-3 rounded-lg"
            style={{ backgroundColor: '#FFF5F5', border: '1px solid #FFCDD2' }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E5376B' }} />
            <p className="text-xs" style={{ color: '#992A5C' }}>
              {error.message || 'Something went wrong. Please try again.'}
            </p>
          </div>
        )}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
