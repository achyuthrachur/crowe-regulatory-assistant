'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';

interface PromptCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  prompt: string;
}

export function PromptCard({ icon: Icon, label, description, prompt }: PromptCardProps) {
  const { submitPromptToChat, addToPromptHistory } = useAppContext();
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(true);
    addToPromptHistory({ label, prompt });
    submitPromptToChat?.(prompt);
    setTimeout(() => setIsActive(false), 1500);
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="w-full rounded-lg p-3 mb-2 cursor-pointer text-left transition-all duration-150 flex items-start gap-3"
      style={{
        backgroundColor: isActive ? 'rgba(245,168,0,0.06)' : 'rgba(255,255,255,0.03)',
        border: isActive ? '1px solid #F5A800' : '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(245,168,0,0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)';
        }
      }}
    >
      <div className="mt-0.5 flex-shrink-0">
        <Icon className="w-4 h-4 text-[#F5A800]" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span
          className="text-sm text-white"
          style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700 }}
        >
          {label}
        </span>
        <span
          className="text-[11px] text-[#828282] leading-snug"
          style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          {description}
        </span>
      </div>
    </motion.button>
  );
}
