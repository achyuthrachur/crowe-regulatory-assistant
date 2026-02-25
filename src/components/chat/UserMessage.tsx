'use client';

import { motion } from 'framer-motion';

interface UserMessageProps {
  content: string;
  timestamp?: Date;
}

export function UserMessage({ content, timestamp }: UserMessageProps) {
  const timeStr = timestamp
    ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <motion.div
      className="flex justify-end mb-4"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="max-w-[85%] flex flex-col items-end">
        <div
          className="rounded-2xl rounded-tr-sm px-4 py-3"
          style={{ backgroundColor: '#011E41' }}
        >
          <p
            className="text-sm text-white leading-relaxed"
            style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {content}
          </p>
        </div>
        {timeStr && (
          <span className="text-[10px] text-white/40 mt-1 text-right">{timeStr}</span>
        )}
      </div>
    </motion.div>
  );
}
