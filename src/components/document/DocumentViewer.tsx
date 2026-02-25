'use client';

import { FileText, X, PanelLeftClose } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '@/lib/context/AppContext';
import { UploadZone } from './UploadZone';

interface DocumentViewerProps {
  onCollapse?: () => void;
}

export function DocumentViewer({ onCollapse }: DocumentViewerProps) {
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
      style={{ backgroundColor: '#F8F9FA', borderRight: '1px solid #E0E0E0' }}
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
              style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E0E0E0' }}
            >
              <div className="flex items-center overflow-hidden">
                <FileText className="w-4 h-4 text-[#F5A800] flex-shrink-0" />
                <span
                  className="text-sm font-medium ml-2 truncate"
                  style={{ color: '#011E41' }}
                >
                  {truncatedFilename}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                {document.pageCount && (
                  <span className="text-xs text-[#828282]">{document.pageCount} pages</span>
                )}
                {onCollapse && (
                  <button
                    onClick={onCollapse}
                    className="transition-colors cursor-pointer"
                    style={{ color: '#BDBDBD' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#011E41')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#BDBDBD')}
                    aria-label="Hide document preview"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={clearDocument}
                  className="transition-colors cursor-pointer"
                  style={{ color: '#BDBDBD' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#011E41')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#BDBDBD')}
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
                background: 'linear-gradient(to bottom, #F8F9FA, transparent)',
              }}
            />

            {/* Document content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 doc-scroll">
              <div
                className="text-[13px] leading-relaxed whitespace-pre-wrap"
                style={{
                  color: '#333333',
                  fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
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
