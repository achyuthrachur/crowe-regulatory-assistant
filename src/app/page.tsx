'use client';

import { motion } from 'framer-motion';
import { TopNav } from '@/components/layout/TopNav';
import { PromptSidebar } from '@/components/sidebar/PromptSidebar';
import { DocumentViewer } from '@/components/document/DocumentViewer';
import { ChatWindow } from '@/components/chat/ChatWindow';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ backgroundColor: '#011E41' }}>
      <TopNav />
      <main className="flex flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0 }}
        >
          <PromptSidebar />
        </motion.div>

        <motion.div
          className="flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
        >
          <DocumentViewer />
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
