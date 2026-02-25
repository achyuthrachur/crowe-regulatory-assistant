'use client';

import { FileText, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '@/lib/context/AppContext';
import { UploadZone } from './UploadZone';

export function DocumentViewer() {
  const { document, clearDocument } = useAppContext();
  const isLoaded = !!document.content;

  const truncatedFilename = document.filename
    ? document.filename.length > 32
      ? document.filename.slice(0, 29) + '...'
      : document.filename
    : '';

  return (
    <div
      className="flex-1 h-[calc(100vh-3.5rem)] overflow-hidden relative"
      style={{ backgroundColor: '#012348', borderRight: '1px solid rgba(255,255,255,0.08)' }}
    >
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="h-full flex items-center justify-center"
          >
            <UploadZone />
          </motion.div>
        ) : (
          <motion.div
            key="loaded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            {/* Header */}
            <div
              className="h-12 flex items-center justify-between px-5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center overflow-hidden">
                <FileText className="w-4 h-4 text-[#F5A800] flex-shrink-0" />
                <span className="text-sm text-white font-medium ml-2 truncate">{truncatedFilename}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                {document.pageCount && (
                  <span className="text-xs text-[#828282]">{document.pageCount} pages</span>
                )}
                <button
                  onClick={clearDocument}
                  className="text-[#828282] hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear document"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Top fade gradient */}
            <div
              className="absolute left-0 right-0 h-6 pointer-events-none z-10"
              style={{
                top: '3rem',
                background: 'linear-gradient(to bottom, #012348, transparent)',
              }}
            />

            {/* Document content */}
            <div
              className="flex-1 overflow-y-auto px-6 py-5 doc-scroll"
            >
              <div
                className="text-[13px] text-[#E0E0E0] leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
              >
                {document.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
