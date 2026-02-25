import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/AppContext';

export const metadata: Metadata = {
  title: 'Crowe Regulatory Assistant — Exam Prep. Accelerated.',
  description:
    'AI-powered compliance tool for analyzing bank examination findings, drafting management responses, and building remediation plans.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{<AppProvider>{children}</AppProvider>}</body>
    </html>
  );
}
