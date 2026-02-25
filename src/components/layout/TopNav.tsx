'use client';

import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/lib/context/AppContext';

export function TopNav() {
  const { document } = useAppContext();
  const isDocLoaded = !!document.content;

  const truncatedFilename = document.filename
    ? document.filename.length > 24
      ? document.filename.slice(0, 21) + '...'
      : document.filename
    : '';

  function handleReset() {
    window.location.reload();
  }

  return (
    <nav
      className="w-full h-14 flex items-center justify-between px-6 flex-shrink-0 z-50"
      style={{
        backgroundColor: '#011E41',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Left: Branding */}
      <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crowe-logo-white.svg"
          alt="Crowe"
          className="h-7 w-auto"
        />
        <div
          className="mx-4"
          style={{ width: '1px', height: '1.25rem', backgroundColor: 'rgba(255,255,255,0.2)' }}
        />
        <span
          className="text-sm text-white tracking-wide"
          style={{
            fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          Regulatory Assistant
        </span>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-3">
        {/* Model badge */}
        <Badge
          className="text-xs"
          style={{
            backgroundColor: 'rgba(245,168,0,0.12)',
            border: '1px solid rgba(245,168,0,0.3)',
            color: '#F5A800',
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          GPT-4o
        </Badge>

        {/* Document status */}
        <div className="flex items-center gap-1.5">
          {isDocLoaded ? (
            <motion.span
              className="w-2 h-2 rounded-full bg-[#05AB8C] inline-block"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: 3, ease: 'easeInOut' }}
            />
          ) : (
            <span className="w-2 h-2 rounded-full bg-[#828282] inline-block" />
          )}
          <span
            className={`text-xs ${isDocLoaded ? 'text-[#E0E0E0]' : 'text-[#828282]'}`}
            style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {isDocLoaded ? truncatedFilename : 'No document loaded'}
          </span>
        </div>

        {/* Reset button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs text-[#828282] hover:text-white hover:bg-white/5 cursor-pointer"
          style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
    </nav>
  );
}
