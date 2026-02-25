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
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      {/* Left: Branding */}
      <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crowe-logo-color.svg"
          alt="Crowe"
          className="h-7 w-auto"
        />
        <div
          className="mx-4"
          style={{ width: '1px', height: '1.25rem', backgroundColor: '#E0E0E0' }}
        />
        <span
          className="text-sm tracking-wide"
          style={{
            color: '#011E41',
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
            backgroundColor: 'rgba(245,168,0,0.1)',
            border: '1px solid rgba(245,168,0,0.35)',
            color: '#D7761D',
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
            <span className="w-2 h-2 rounded-full bg-[#BDBDBD] inline-block" />
          )}
          <span
            className="text-xs"
            style={{
              color: isDocLoaded ? '#4F4F4F' : '#BDBDBD',
              fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {isDocLoaded ? truncatedFilename : 'No document loaded'}
          </span>
        </div>

        {/* Reset button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs cursor-pointer"
          style={{
            color: '#828282',
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
    </nav>
  );
}
