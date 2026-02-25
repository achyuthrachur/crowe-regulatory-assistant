'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TypingIndicator } from './TypingIndicator';

interface AssistantMessageProps {
  content: string;
  isStreaming?: boolean;
  timestamp?: Date;
}

const fontBody = "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const fontHeading = "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif";

export function AssistantMessage({ content, isStreaming, timestamp }: AssistantMessageProps) {
  const timeStr = timestamp
    ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <motion.div
      className="flex justify-start mb-4 gap-3"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: '#011E41' }}
      >
        <Bot className="w-4 h-4 text-[#F5A800]" />
      </div>

      {/* Bubble */}
      <div className="max-w-[90%] flex flex-col">
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-3"
          style={{ backgroundColor: '#F8F9FA', border: '1px solid #E0E0E0' }}
        >
          {isStreaming && !content ? (
            <TypingIndicator />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1
                    className="text-base text-[#011E41] mb-2 mt-1"
                    style={{ fontFamily: fontHeading, fontWeight: 700 }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    className="text-sm text-[#011E41] mb-1.5 mt-3"
                    style={{ fontFamily: fontHeading, fontWeight: 700 }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className="text-sm text-[#002E62] mb-1 mt-2"
                    style={{ fontFamily: fontBody, fontWeight: 700 }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p
                    className="text-sm text-[#333333] leading-relaxed mb-2"
                    style={{ fontFamily: fontBody }}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="pl-4 mb-2 space-y-1 list-disc">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="pl-4 mb-2 space-y-1 list-decimal">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm text-[#333333]" style={{ fontFamily: fontBody }}>
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong
                    className="text-[#011E41]"
                    style={{ fontFamily: fontBody, fontWeight: 700 }}
                  >
                    {children}
                  </strong>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  if (isBlock) {
                    return (
                      <code
                        className="block bg-[#E0E0E0] text-[#002E62] text-xs px-3 py-2 rounded font-mono my-2 overflow-x-auto"
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="bg-[#E0E0E0] text-[#002E62] text-xs px-1.5 py-0.5 rounded font-mono">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="my-2 overflow-x-auto">{children}</pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className="border-l-2 border-[#F5A800] pl-3 text-[#4F4F4F] text-sm italic my-2"
                    style={{ fontFamily: fontBody }}
                  >
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3">
                    <table className="w-full text-sm border-collapse">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    className="text-left text-xs text-[#011E41] px-3 py-2 border-b border-[#E0E0E0]"
                    style={{ fontFamily: fontBody, fontWeight: 700, backgroundColor: '#F0F2F5' }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    className="text-sm text-[#333333] px-3 py-2 border-b border-[#E0E0E0]"
                    style={{ fontFamily: fontBody }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
        {timeStr && !isStreaming && (
          <span className="text-[10px] text-[#828282] mt-1 ml-1">{timeStr}</span>
        )}
      </div>
    </motion.div>
  );
}
