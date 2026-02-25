'use client';

import { useEffect, useCallback } from 'react';
import { useChat } from 'ai/react';
import { Bot } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  const { document, setSubmitPromptToChat } = useAppContext();

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    body: { documentContext: document.content ?? '' },
  });

  const submitPromptToChat = useCallback(
    (text: string) => {
      append({ role: 'user', content: text });
    },
    [append]
  );

  useEffect(() => {
    setSubmitPromptToChat(submitPromptToChat);
    return () => setSubmitPromptToChat(null);
  }, [submitPromptToChat, setSubmitPromptToChat]);

  return (
    <div
      className="w-[440px] h-[calc(100vh-3.5rem)] flex flex-col flex-shrink-0"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Header */}
      <div className="h-12 flex items-center px-5 border-b border-[#E0E0E0] flex-shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#011E41' }}
        >
          <Bot className="w-4 h-4 text-[#F5A800]" />
        </div>
        <div className="ml-2.5">
          <p
            className="text-sm text-[#011E41]"
            style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700 }}
          >
            Regulatory Assistant
          </p>
          <p className="text-[10px] text-[#828282]">Powered by GPT-4o</p>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
