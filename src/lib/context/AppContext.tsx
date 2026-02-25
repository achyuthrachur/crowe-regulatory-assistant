'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface DocumentState {
  content: string | null;
  filename: string | null;
  pageCount: number | null;
}

interface PromptHistoryEntry {
  label: string;
  prompt: string;
}

interface AppContextValue {
  document: DocumentState;
  setDocument: (doc: DocumentState) => void;
  clearDocument: () => void;
  promptHistory: PromptHistoryEntry[];
  addToPromptHistory: (entry: PromptHistoryEntry) => void;
  submitPromptToChat: ((text: string) => void) | null;
  setSubmitPromptToChat: (fn: ((text: string) => void) | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [document, setDocumentState] = useState<DocumentState>({
    content: null,
    filename: null,
    pageCount: null,
  });

  const [promptHistory, setPromptHistory] = useState<PromptHistoryEntry[]>([]);
  const [submitPromptToChat, setSubmitPromptToChatState] = useState<
    ((text: string) => void) | null
  >(null);

  const setDocument = useCallback((doc: DocumentState) => {
    setDocumentState(doc);
  }, []);

  const clearDocument = useCallback(() => {
    setDocumentState({ content: null, filename: null, pageCount: null });
  }, []);

  const addToPromptHistory = useCallback((entry: PromptHistoryEntry) => {
    setPromptHistory((prev) => {
      const next = [entry, ...prev];
      return next.slice(0, 20);
    });
  }, []);

  const setSubmitPromptToChat = useCallback(
    (fn: ((text: string) => void) | null) => {
      setSubmitPromptToChatState(() => fn);
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        document,
        setDocument,
        clearDocument,
        promptHistory,
        addToPromptHistory,
        submitPromptToChat,
        setSubmitPromptToChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
