'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSearch,
  AlertTriangle,
  BookOpen,
  PenLine,
  Users,
  CalendarClock,
  Network,
  CheckSquare,
} from 'lucide-react';
import { PromptCard } from './PromptCard';
import { useAppContext } from '@/lib/context/AppContext';

const PROMPT_GROUPS = [
  {
    label: 'Analysis',
    cards: [
      {
        icon: FileSearch,
        label: 'Summarize Finding',
        description: 'Extract the core finding, regulatory standard cited, and severity',
        prompt:
          'Summarize this regulatory finding. Identify: (1) the core compliance issue, (2) the specific regulation or guidance being cited, (3) the severity level implied, and (4) which business line or function is primarily affected. Use headers for each section and cite specific language from the document.',
      },
      {
        icon: AlertTriangle,
        label: 'Identify Control Gaps',
        description: 'Map the finding to specific gaps in existing controls',
        prompt:
          'Based on this finding, identify the specific control gaps or deficiencies being cited. For each gap, describe: (1) what control is missing or inadequate, (2) what the examiner expected to see, and (3) the potential regulatory consequence if unaddressed. Reference specific language from the document in your response.',
      },
      {
        icon: BookOpen,
        label: 'Regulatory Standard Referenced',
        description: 'Identify and explain the specific rule or guidance',
        prompt:
          "Identify every regulatory standard, guidance document, or supervisory expectation referenced in this finding. For each one, provide: (1) the full name and citation, (2) a plain-language explanation of what it requires, and (3) how the bank's current practices appear to fall short based on the document.",
      },
    ],
  },
  {
    label: 'Drafting',
    cards: [
      {
        icon: PenLine,
        label: 'Draft Management Response',
        description: 'Generate a formal response acknowledging the finding',
        prompt:
          'Draft a formal management response to this regulatory finding. The response should: (1) acknowledge the finding without admitting fault beyond what is necessary, (2) describe the corrective actions we are committing to, (3) include a target completion date placeholder [DATE], (4) identify the responsible executive [NAME/TITLE], and (5) maintain a professional, cooperative tone consistent with regulatory correspondence. Format as a formal memo.',
      },
      {
        icon: Users,
        label: 'Audit Committee Summary',
        description: 'Translate the finding for board-level communication',
        prompt:
          'Translate this regulatory finding into an executive summary suitable for presentation to the Audit Committee or Board. Avoid technical jargon. The summary should cover: (1) what the examiner found in plain language, (2) what risk it presents to the institution, (3) what management is doing about it, and (4) what the committee should know or decide. Maximum two paragraphs.',
      },
    ],
  },
  {
    label: 'Remediation',
    cards: [
      {
        icon: CalendarClock,
        label: '90-Day Remediation Plan',
        description: 'Generate a structured plan with milestones',
        prompt:
          'Create a 90-day remediation plan to address this finding. Structure it in three 30-day phases. For each phase include: specific actions to be taken, responsible parties (use generic titles), dependencies, and success criteria. Format as a structured table. The plan should be defensible if presented to the examiner.',
      },
      {
        icon: Network,
        label: 'Workstream Breakdown',
        description: 'Identify owners and workstreams across the org',
        prompt:
          'Break this finding down into discrete workstreams that would need to be addressed across the organization. For each workstream identify: (1) the functional area responsible (e.g. Compliance, Technology, Operations, Legal), (2) the nature of the work required, (3) an estimated level of effort (Low/Medium/High), and (4) any dependencies on other workstreams. Format as a structured table.',
      },
      {
        icon: CheckSquare,
        label: 'Validation Checklist',
        description: 'Generate criteria to verify remediation is complete',
        prompt:
          'Generate a validation checklist that examiners or internal audit would use to confirm that remediation of this finding is complete. For each checklist item include: (1) what evidence would demonstrate completion, (2) who would be responsible for providing it, and (3) how it maps back to the original finding. This will be used in a follow-up examination.',
      },
    ],
  },
];

export function PromptSidebar() {
  const { promptHistory, submitPromptToChat } = useAppContext();
  const totalCards = PROMPT_GROUPS.reduce((sum, g) => sum + g.cards.length, 0);
  const recentHistory = promptHistory.slice(0, 5);

  return (
    <div
      className="w-72 h-[calc(100vh-3.5rem)] flex flex-col flex-shrink-0"
      style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E0E0E0' }}
    >
      {/* Scrollable prompt area */}
      <div className="flex-1 overflow-y-auto p-4 sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-xs uppercase tracking-widest"
            style={{
              color: '#828282',
              fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            Prompt Library
          </p>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'rgba(245,168,0,0.1)',
              border: '1px solid rgba(245,168,0,0.35)',
              color: '#D7761D',
            }}
          >
            {totalCards}
          </span>
        </div>

        {/* Groups */}
        {PROMPT_GROUPS.map((group, gi) => (
          <div key={group.label}>
            <p
              className={`text-[10px] uppercase tracking-widest mb-2 ${gi === 0 ? 'mt-0' : 'mt-5'}`}
              style={{
                color: '#828282',
                fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
              }}
            >
              {group.label}
            </p>
            <hr className="mb-3" style={{ borderColor: '#E0E0E0' }} />
            {group.cards.map((card) => (
              <PromptCard key={card.label} {...card} />
            ))}
          </div>
        ))}
      </div>

      {/* Session History footer */}
      <div
        className="flex-shrink-0 pt-3 pb-4 px-4"
        style={{ borderTop: '1px solid #E0E0E0', backgroundColor: '#FAFAFA' }}
      >
        <p
          className="text-[10px] uppercase tracking-widest mb-2"
          style={{
            color: '#828282',
            fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          Session History
        </p>
        {recentHistory.length === 0 ? (
          <p
            className="text-[11px] italic"
            style={{
              color: '#BDBDBD',
              fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            No prompts used yet
          </p>
        ) : (
          <AnimatePresence>
            {recentHistory.map((entry, index) => (
              <motion.button
                key={`${entry.label}-${index}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="block w-full text-left text-[11px] cursor-pointer py-0.5 truncate transition-colors"
                style={{
                  color: '#4F4F4F',
                  fontFamily: "'Helvetica Now Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#011E41')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#4F4F4F')}
                onClick={() => submitPromptToChat?.(entry.prompt)}
                title={entry.label}
              >
                {entry.label.length > 28 ? entry.label.slice(0, 25) + '...' : entry.label}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
