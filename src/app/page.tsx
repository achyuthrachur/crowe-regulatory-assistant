'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight } from 'lucide-react';
import { TopNav } from '@/components/layout/TopNav';
import { PromptSidebar } from '@/components/sidebar/PromptSidebar';
import { DocumentViewer } from '@/components/document/DocumentViewer';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useAppContext } from '@/lib/context/AppContext';

export default function Home() {
  const { document } = useAppContext();
  const hasDoc = !!document.content;
  const [docPreviewOpen, setDocPreviewOpen] = useState(true);

  // Reset to open whenever the document is cleared
  useEffect(() => {
    if (!hasDoc) setDocPreviewOpen(true);
  }, [hasDoc]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNav />
      <main className="flex flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0 }}
        >
          <PromptSidebar />
        </motion.div>

        {/* Document panel — flex-1 wrapper stays fixed so chat never moves */}
        <motion.div
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {(!hasDoc || docPreviewOpen) ? (
              <motion.div
                key="doc-open"
                className="h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <DocumentViewer
                  onCollapse={hasDoc ? () => setDocPreviewOpen(false) : undefined}
                />
              </motion.div>
            ) : (
              <motion.div
                key="doc-closed"
                className="h-full flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {/* Thin collapsed strip with reopen button */}
                <div
                  className="w-11 h-full flex flex-col items-center pt-3 flex-shrink-0"
                  style={{ borderRight: '1px solid #E0E0E0', backgroundColor: '#FFFFFF' }}
                >
                  <button
                    onClick={() => setDocPreviewOpen(true)}
                    title={document.filename ?? 'Show document preview'}
                    className="flex flex-col items-center gap-1.5 p-2 rounded cursor-pointer transition-colors"
                    style={{ color: '#BDBDBD' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#011E41')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#BDBDBD')}
                    aria-label="Show document preview"
                  >
                    <FileText className="w-4 h-4" />
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.16 }}
        >
          <ChatWindow />
        </motion.div>
      </main>
    </div>
  );
}
