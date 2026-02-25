'use client';

import { useRef, FormEvent, KeyboardEvent } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ChatInput({ input, isLoading, onChange, onSubmit }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const ta = e.currentTarget;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        const form = e.currentTarget.closest('form');
        if (form) form.requestSubmit();
      }
    }
  }

  const hasInput = input.trim().length > 0;

  return (
    <div className="border-t border-[#E0E0E0] p-4 flex-shrink-0">
      <form onSubmit={onSubmit}>
        <div
          className="flex items-end gap-3 rounded-xl px-4 py-3 transition-all duration-150"
          style={{
            backgroundColor: '#F8F9FA',
            border: '1px solid #E0E0E0',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.border = '1px solid #003F9F';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 2px rgba(0,63,159,0.1)';
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              (e.currentTarget as HTMLElement).style.border = '1px solid #E0E0E0';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={onChange}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the document..."
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none border-none text-sm text-[#333333] placeholder-[#BDBDBD] min-h-[36px] max-h-[120px]"
            style={{
              fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              lineHeight: '1.5',
            }}
          />
          <button
            type="submit"
            disabled={!hasInput || isLoading}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 self-end transition-colors duration-150"
            style={{
              backgroundColor: hasInput && !isLoading ? '#011E41' : '#E0E0E0',
              cursor: hasInput && !isLoading ? 'pointer' : 'not-allowed',
            }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <ArrowUp
                className="w-4 h-4"
                style={{ color: hasInput ? 'white' : '#BDBDBD' }}
              />
            )}
          </button>
        </div>
      </form>
      <p className="text-[10px] text-[#BDBDBD] mt-2 text-center">
        Responses are AI-generated. Always verify against source documents.
      </p>
    </div>
  );
}
