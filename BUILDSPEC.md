# Crowe Regulatory Assistant — Full Build Specification

## Project Identity

| Field | Value |
|-------|-------|
| **Name** | `crowe-regulatory-assistant` |
| **App Display Name** | Crowe Regulatory Assistant |
| **Tagline** | Exam Prep. Accelerated. |
| **Repo** | `https://github.com/achyuthrachur/crowe-regulatory-assistant` |
| **Production URL** | `https://crowe-regulatory-assistant.vercel.app` |

---

## Environment Variables

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
NEXT_PUBLIC_APP_NAME=Crowe Regulatory Assistant
```

---

## Full Application Layout

The app is a single-page layout with no navigation between routes. The root `/` is the entire experience. There is no login, no onboarding, no multi-page flow.

```
┌─────────────────────────────────────────────────────────────┐
│                        TOP NAV BAR                          │  h-14
├──────────────────┬──────────────────────┬───────────────────┤
│                  │                      │                   │
│  PROMPT SIDEBAR  │   DOCUMENT VIEWER    │   CHAT WINDOW     │
│     w-72         │       flex-1         │      w-[440px]    │
│                  │                      │                   │
│                  │                      │                   │
│                  │                      │                   │
└──────────────────┴──────────────────────┴───────────────────┘
```

Total viewport: `100vw x 100vh`, no scroll on the outer shell. Each panel scrolls independently. Background color of the outer shell: `#011E41` (Crowe Indigo Dark).

---

## Section 1: Top Navigation Bar

**Component:** `src/components/layout/TopNav.tsx`

**Dimensions:** `w-full h-14` fixed at top, `z-50`

**Background:** `#011E41`

**Border bottom:** `1px solid rgba(255,255,255,0.08)`

**Layout:** `flex items-center justify-between px-6`

### Left side — Branding

- Crowe logo SVG (white version), `h-7 w-auto`
- Immediately to the right of logo: a `1px` vertical divider, `h-5`, color `rgba(255,255,255,0.2)`, `mx-4`
- App name text: `Regulatory Assistant`, font Helvetica Now Display Bold, `text-sm`, color `#FFFFFF`, `tracking-wide`

### Right side — Status indicators

Three items in a flex row with `gap-3`:

**1. Model badge**
- shadcn `Badge` variant custom
- Background: `rgba(245,168,0,0.12)`
- Border: `1px solid rgba(245,168,0,0.3)`
- Text: `GPT-4o`, `text-xs`, color `#F5A800`, font Helvetica Now Text Regular
- No icon

**2. Document status indicator**
- When no document loaded: dot `w-2 h-2 rounded-full bg-[#828282]` + text `No document loaded`, `text-xs text-[#828282]`
- When document loaded: dot `w-2 h-2 rounded-full bg-[#05AB8C]` with a Motion pulse animation (see Animation section) + text showing filename truncated to 24 chars, `text-xs text-[#E0E0E0]`

**3. Session reset button**
- shadcn `Button` variant `ghost`, size `sm`
- Icon: Lucide `RotateCcw`, `w-4 h-4`
- Text: `Reset`, `text-xs`
- Color: `text-[#828282]` default, `hover:text-white hover:bg-white/5`
- On click: clears document and chat state, reloads page

---

## Section 2: Prompt Sidebar

**Component:** `src/components/sidebar/PromptSidebar.tsx`

**Dimensions:** `w-72 h-[calc(100vh-3.5rem)]` (full height minus nav)

**Background:** `#011E41`

**Border right:** `1px solid rgba(255,255,255,0.08)`

**Overflow:** `overflow-y-auto` with custom scrollbar: `2px wide`, `bg-white/10` track, `bg-white/30` thumb

**Internal padding:** `p-4`

### Sidebar Header

- Text: `Prompt Library`, Helvetica Now Text Bold, `text-xs`, color `#828282`, `uppercase tracking-widest`, `mb-4`

### Prompt Groups

Three groups. Each group:
- Group label: `text-[10px] font-bold uppercase tracking-widest text-[#828282] mb-2 mt-5 first:mt-0`
- After the label: a `1px solid rgba(255,255,255,0.06)` horizontal rule `mb-3`

**Group 1: Analysis**

Prompt Card 1:
- Icon: Lucide `FileSearch`, `w-4 h-4`
- Label: `Summarize Finding`
- Description: `Extract the core finding, regulatory standard cited, and severity`
- Prompt injected: `"Summarize this regulatory finding. Identify: (1) the core compliance issue, (2) the specific regulation or guidance being cited, (3) the severity level implied, and (4) which business line or function is primarily affected. Use headers for each section and cite specific language from the document."`

Prompt Card 2:
- Icon: Lucide `AlertTriangle`, `w-4 h-4`
- Label: `Identify Control Gaps`
- Description: `Map the finding to specific gaps in existing controls`
- Prompt injected: `"Based on this finding, identify the specific control gaps or deficiencies being cited. For each gap, describe: (1) what control is missing or inadequate, (2) what the examiner expected to see, and (3) the potential regulatory consequence if unaddressed. Reference specific language from the document in your response."`

Prompt Card 3:
- Icon: Lucide `BookOpen`, `w-4 h-4`
- Label: `Regulatory Standard Referenced`
- Description: `Identify and explain the specific rule or guidance`
- Prompt injected: `"Identify every regulatory standard, guidance document, or supervisory expectation referenced in this finding. For each one, provide: (1) the full name and citation, (2) a plain-language explanation of what it requires, and (3) how the bank's current practices appear to fall short based on the document."`

**Group 2: Drafting**

Prompt Card 4:
- Icon: Lucide `PenLine`, `w-4 h-4`
- Label: `Draft Management Response`
- Description: `Generate a formal response acknowledging the finding`
- Prompt injected: `"Draft a formal management response to this regulatory finding. The response should: (1) acknowledge the finding without admitting fault beyond what is necessary, (2) describe the corrective actions we are committing to, (3) include a target completion date placeholder [DATE], (4) identify the responsible executive [NAME/TITLE], and (5) maintain a professional, cooperative tone consistent with regulatory correspondence. Format as a formal memo."`

Prompt Card 5:
- Icon: Lucide `Users`, `w-4 h-4`
- Label: `Audit Committee Summary`
- Description: `Translate the finding for board-level communication`
- Prompt injected: `"Translate this regulatory finding into an executive summary suitable for presentation to the Audit Committee or Board. Avoid technical jargon. The summary should cover: (1) what the examiner found in plain language, (2) what risk it presents to the institution, (3) what management is doing about it, and (4) what the committee should know or decide. Maximum two paragraphs."`

**Group 3: Remediation**

Prompt Card 6:
- Icon: Lucide `CalendarClock`, `w-4 h-4`
- Label: `90-Day Remediation Plan`
- Description: `Generate a structured plan with milestones`
- Prompt injected: `"Create a 90-day remediation plan to address this finding. Structure it in three 30-day phases. For each phase include: specific actions to be taken, responsible parties (use generic titles), dependencies, and success criteria. Format as a structured table. The plan should be defensible if presented to the examiner."`

Prompt Card 7:
- Icon: Lucide `Network`, `w-4 h-4`
- Label: `Workstream Breakdown`
- Description: `Identify owners and workstreams across the org`
- Prompt injected: `"Break this finding down into discrete workstreams that would need to be addressed across the organization. For each workstream identify: (1) the functional area responsible (e.g. Compliance, Technology, Operations, Legal), (2) the nature of the work required, (3) an estimated level of effort (Low/Medium/High), and (4) any dependencies on other workstreams. Format as a structured table."`

Prompt Card 8:
- Icon: Lucide `CheckSquare`, `w-4 h-4`
- Label: `Validation Checklist`
- Description: `Generate criteria to verify remediation is complete`
- Prompt injected: `"Generate a validation checklist that examiners or internal audit would use to confirm that remediation of this finding is complete. For each checklist item include: (1) what evidence would demonstrate completion, (2) who would be responsible for providing it, and (3) how it maps back to the original finding. This will be used in a follow-up examination."`

### Prompt Card Component Spec

**Component:** `src/components/sidebar/PromptCard.tsx`

**Dimensions:** `w-full rounded-lg p-3 mb-2 cursor-pointer`

**Background default:** `rgba(255,255,255,0.03)`
**Background hover:** `rgba(255,255,255,0.07)`
**Border default:** `1px solid rgba(255,255,255,0.06)`
**Border hover:** `1px solid rgba(245,168,0,0.3)`

**Transition:** `transition-all duration-150`

**Layout:** `flex items-start gap-3`

**Icon container:** `mt-0.5 flex-shrink-0`, icon color `#F5A800`

**Text container:** `flex flex-col gap-0.5`
- Label: Helvetica Now Text Bold, `text-sm text-white`
- Description: Helvetica Now Text Regular, `text-[11px] text-[#828282] leading-snug`

**Active/loading state:** border becomes `1px solid #F5A800`, background `rgba(245,168,0,0.06)`, slight scale `0.98` via Motion

**On click behavior:** injects the full prompt string into the chat input field and immediately triggers submission — the user does not manually hit send.

### Sidebar Footer

At the bottom of the sidebar, pinned with `sticky bottom-0`:
- Background: `#011E41`, `pt-3 pb-4`, `border-top: 1px solid rgba(255,255,255,0.08)`
- Text: `Session History`, same style as group labels
- Below: list of previously submitted prompts this session, each as a truncated single line, `text-[11px] text-[#828282]`, max 5 shown, hover `text-white cursor-pointer` (clicking re-submits that prompt)
- If no history: text `No prompts used yet`, `text-[11px] text-[#4F4F4F] italic`

---

## Section 3: Document Viewer Panel

**Component:** `src/components/document/DocumentViewer.tsx`

**Dimensions:** `flex-1 h-[calc(100vh-3.5rem)]`

**Background:** `#012348` (slightly lighter than nav/sidebar, creates depth)

**Border right:** `1px solid rgba(255,255,255,0.08)`

**Overflow:** `hidden` outer, `overflow-y-auto` inner content area

### Empty State (no document loaded)

Centered vertically and horizontally within the panel:

**Upload zone component:** `src/components/document/UploadZone.tsx`
- Container: `w-80 flex flex-col items-center`
- Dashed border box: `w-full rounded-xl border-2 border-dashed border-[rgba(255,255,255,0.15)] p-10 flex flex-col items-center gap-4`
- On hover/drag-over: border color `rgba(245,168,0,0.5)`, background `rgba(245,168,0,0.03)`
- Icon: Lucide `FileUp`, `w-10 h-10 text-[#F5A800]`
- Primary text: `Upload Exam Document`, Helvetica Now Display Bold, `text-base text-white`
- Secondary text: `PDF or plain text · Up to 10MB`, `text-xs text-[#828282]`
- Button: shadcn `Button`, custom styling: background `#F5A800`, text `#011E41`, Helvetica Now Text Bold, `text-sm`, `hover:bg-[#FFD231]`, `h-9 px-5 rounded-md mt-2`
- Button text: `Choose File`
- Below the button: `text-[11px] text-[#4F4F4F]` — `or drag and drop`

Below the upload zone, `mt-6`:
- Text: `Demo document preloaded`, `text-xs text-[#4F4F4F]`
- A `text-xs text-[#F5A800] underline cursor-pointer` link: `Load synthetic MRA document`
- Clicking this loads the baked-in synthetic MRA without an upload

### Loaded State (document present)

**Document panel header:** `h-12 flex items-center justify-between px-5 border-b border-white/5`
- Left: Lucide `FileText` `w-4 h-4 text-[#F5A800]` + filename in `text-sm text-white font-medium ml-2`, truncated with ellipsis
- Right: page count in `text-xs text-[#828282]` (if PDF) + Lucide `X` button `w-4 h-4 text-[#828282] hover:text-white cursor-pointer` to clear document

**Document content area:** `px-6 py-5 overflow-y-auto h-[calc(100%-3rem)]`
- Background: `#012348`
- Document text rendered in a styled `div`:
  - Font: Helvetica Now Text Regular
  - `text-[13px] text-[#E0E0E0] leading-relaxed`
  - Paragraphs: `mb-3`
- A subtle top fade gradient on the content area: `pointer-events-none absolute top-12 left-0 right-0 h-6 bg-gradient-to-b from-[#012348] to-transparent`

---

## Section 4: Chat Window

**Component:** `src/components/chat/ChatWindow.tsx`

**Dimensions:** `w-[440px] h-[calc(100vh-3.5rem)] flex flex-col flex-shrink-0`

**Background:** `#FFFFFF`

### Chat Header

`h-12 flex items-center px-5 border-b border-[#E0E0E0]`

- Left: small avatar — `w-7 h-7 rounded-full bg-[#011E41] flex items-center justify-center` containing Lucide `Bot` `w-4 h-4 text-[#F5A800]`
- Right of avatar, `ml-2.5`:
  - Line 1: `Regulatory Assistant`, Helvetica Now Text Bold, `text-sm text-[#011E41]`
  - Line 2: `Powered by GPT-4o`, `text-[10px] text-[#828282]`

### Chat Messages Area

**Component:** `src/components/chat/MessageList.tsx`

`flex-1 overflow-y-auto px-5 py-4` with custom scrollbar matching the document panel

**Empty state** (no messages yet):

Centered in the messages area:
- Lucide `MessageSquareDashed` `w-8 h-8 text-[#E0E0E0] mb-3`
- Text: `Select a prompt from the library or type below`, `text-sm text-[#BDBDBD] text-center max-w-[200px]`

### Message Bubble Specs

**User message — Component:** `src/components/chat/UserMessage.tsx`

- Container: `flex justify-end mb-4`
- Bubble: `max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3`
- Background: `#011E41`
- Text: Helvetica Now Text Regular, `text-sm text-white leading-relaxed`
- Timestamp: `text-[10px] text-white/40 mt-1 text-right`

**Assistant message — Component:** `src/components/chat/AssistantMessage.tsx`

- Container: `flex justify-start mb-4 gap-3`
- Left: `w-7 h-7 rounded-full bg-[#011E41] flex items-center justify-center flex-shrink-0 mt-0.5` with Lucide `Bot` `w-4 h-4 text-[#F5A800]`
- Bubble container: `max-w-[90%] flex flex-col`
- Bubble: `rounded-2xl rounded-tl-sm px-4 py-3 bg-[#F8F9FA] border border-[#E0E0E0]`
- Text rendered as markdown:
  - `h1`: Helvetica Now Display Bold, `text-base text-[#011E41] mb-2 mt-1`
  - `h2`: Helvetica Now Display Bold, `text-sm text-[#011E41] mb-1.5 mt-3`
  - `h3`: Helvetica Now Text Bold, `text-sm text-[#002E62] mb-1 mt-2`
  - `p`: Helvetica Now Text Regular, `text-sm text-[#333333] leading-relaxed mb-2`
  - `ul/ol`: `pl-4 mb-2 space-y-1`
  - `li`: `text-sm text-[#333333]`
  - `strong`: Helvetica Now Text Bold, `text-[#011E41]`
  - `code` inline: `bg-[#E0E0E0] text-[#002E62] text-xs px-1.5 py-0.5 rounded font-mono`
  - `blockquote`: `border-l-2 border-[#F5A800] pl-3 text-[#4F4F4F] text-sm italic my-2`
- Timestamp: `text-[10px] text-[#828282] mt-1 ml-1`

**Citation tag** — inline after cited phrase:
`bg-[#F5A800]/10 border border-[#F5A800]/30 text-[#D7761D] text-[10px] px-1.5 py-0.5 rounded ml-1 font-medium` showing `↗ Doc`

### Thinking/Streaming State

- Assistant message bubble appears immediately with typing indicator
- Typing indicator: three dots `w-1.5 h-1.5 rounded-full bg-[#BDBDBD]` animated with Motion stagger (each dot fades up and down, staggered 0.15s, infinite loop)
- As tokens stream in, text replaces the typing indicator and renders progressively
- Bubble height expands smoothly — no layout jump

### Chat Input Area

**Component:** `src/components/chat/ChatInput.tsx`

`border-t border-[#E0E0E0] p-4`

**Input wrapper:** `flex items-end gap-3 bg-[#F8F9FA] rounded-xl border border-[#E0E0E0] px-4 py-3 focus-within:border-[#003F9F] focus-within:ring-2 focus-within:ring-[#003F9F]/10 transition-all duration-150`

**Textarea:**
- shadcn `Textarea` restyled, auto-resize
- No border, no background (transparent, inherits wrapper)
- Font: Helvetica Now Text Regular, `text-sm text-[#333333]`
- Placeholder: `Ask about the document...`, `text-[#BDBDBD]`
- `min-h-[36px] max-h-[120px]`, `resize-none`

**Send button:**
- `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 self-end`
- Default (empty input): `bg-[#E0E0E0]` with Lucide `ArrowUp` `w-4 h-4 text-[#BDBDBD]` — not clickable
- Active (input has text): `bg-[#011E41] cursor-pointer hover:bg-[#002E62]` with Lucide `ArrowUp` `w-4 h-4 text-white`
- Loading: `bg-[#011E41] cursor-not-allowed` with spinning Lucide `Loader2` `w-4 h-4 text-white animate-spin`

**Below input wrapper:** `text-[10px] text-[#BDBDBD] mt-2 text-center`
Text: `Responses are AI-generated. Always verify against source documents.`

---

## Section 5: Animations (Motion/Framer Motion)

All animations use `motion` from `framer-motion`. No CSS keyframe animations except Tailwind's `animate-spin`.

**App initial load:**
- All three panels: `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`, `duration: 0.35, ease: "easeOut"`
- Sidebar: `delay: 0` / Document panel: `delay: 0.08` / Chat panel: `delay: 0.16`

**Document load:**
- Empty state exits: `exit={{ opacity: 0, scale: 0.98 }}`, `duration: 0.2`
- Document content enters: `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`, `duration: 0.4`
- Wrap in `AnimatePresence`

**Message entry:**
- Each new message: `initial={{ opacity: 0, y: 6 }}` → `animate={{ opacity: 1, y: 0 }}`, `duration: 0.25, ease: "easeOut"`
- Wrap message list in `AnimatePresence mode="popLayout"`

**Prompt card click:**
- `whileTap={{ scale: 0.97 }}`

**Document status dot pulse (nav):**
- On document load: `animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}`, `transition: { duration: 2, repeat: 3, ease: "easeInOut" }` — pulses 3 times then stops

**Typing indicator dots:**
- Each dot: `animate={{ y: [0, -4, 0] }}`, `transition: { duration: 0.6, repeat: Infinity, delay: index * 0.15 }`

**Sidebar history item entry:**
- `initial={{ opacity: 0, x: -4 }}` → `animate={{ opacity: 1, x: 0 }}`, staggered `0.05s` per item

---

## Section 6: API Route

**File:** `src/app/api/chat/route.ts`

- Method: `POST`
- Body: `{ messages: Message[], documentContext: string }`
- Uses OpenAI SDK with streaming enabled
- Returns a `ReadableStream` via Vercel AI SDK
- Model: `process.env.OPENAI_MODEL` (defaults to `gpt-4o`)
- `max_tokens: 2048`
- `temperature: 0.3`

**System prompt (inject verbatim):**

```
You are a regulatory compliance specialist assistant embedded in a tool used by bank executives, audit professionals, and Chief Information Security Officers. You have been provided with a regulatory examination document or MRA (Matter Requiring Attention) as context.

Your role is to help the user analyze findings, understand regulatory standards, draft management responses, and develop remediation plans.

Rules you must follow at all times:
1. Always ground your responses in the specific language of the provided document. When referencing the document, quote the relevant phrase or section directly using quotation marks.
2. Use a formal, professional tone appropriate for regulatory and board-level communication.
3. Structure your responses with clear headers and sections. Use markdown formatting.
4. When drafting responses or plans, use placeholder brackets like [DATE], [NAME], [TITLE] where specific information is needed.
5. Never fabricate regulatory standards or citations. If a specific regulation is referenced in the document, cite it accurately. If you are unsure of a citation, say so.
6. Be concise but thorough. Executives are time-constrained. Lead with the most important point.
7. If asked to draft a management response, the tone must be cooperative with regulators, acknowledge the finding, and commit to specific corrective action without being overly defensive.

The examination document is provided below between the markers START_DOCUMENT and END_DOCUMENT.

START_DOCUMENT
{documentContext}
END_DOCUMENT
```

---

## Section 7: Data Flow & State

**Context:** `src/lib/context/AppContext.tsx`

```typescript
interface AppState {
  document: {
    content: string | null;
    filename: string | null;
    pageCount: number | null;
  };
  messages: Message[];
  isLoading: boolean;
  promptHistory: string[];
}
```

- `document.content` — full parsed text string
- `messages` — OpenAI message format: `{ role: 'user' | 'assistant', content: string, timestamp: Date }`
- `isLoading` — true while API stream is open
- `promptHistory` — array of prompt label strings (not full prompts), appended on each prompt card click

No persistence — everything lives in React state. On page refresh, state resets.

---

## Section 8: Document Parsing

**File:** `src/lib/parseDocument.ts`

- `.txt` and `.md`: read as plain text via `FileReader`
- `.pdf`: use `pdfjs-dist` in the browser, extract text page by page
- Output: single string with page breaks as `\n\n---\n\n`
- Character limit: truncate at 80,000 characters, append: `[Document truncated at 80,000 characters for processing]`
- On completion: set `document.content` and `document.filename` in state

---

## Section 9: Synthetic MRA Document

**File:** `src/lib/syntheticMRA.ts` — exported as constant string `SYNTHETIC_MRA_DOCUMENT`

The document must read as an authentic Federal Reserve examination finding.

| Field | Value |
|-------|-------|
| **Institution** | First Heartland Bank, N.A. (fictional) |
| **Examination period** | January 2024 — June 2024 |
| **Examiner** | Federal Reserve Bank of Chicago (fictional examiner names) |
| **Finding type** | Matter Requiring Attention (MRA) |
| **Topic** | BSA/AML Transaction Monitoring Program deficiencies |

**Three specific deficiencies to cover:**
1. Inadequate tuning methodology for the automated monitoring system
2. Excessive alert backlog indicating insufficient staffing
3. SAR filing timeliness failures

**Regulatory standards to cite:**
- Bank Secrecy Act (31 U.S.C. § 5318)
- FinCEN SAR regulations (31 C.F.R. § 1020.320)
- Federal Reserve SR 05-19 guidance on BSA/AML compliance programs
- FFIEC BSA/AML Examination Manual

**Tone:** Formal examiner language — dry, precise, citations in footnote style

**Length:** 600–800 words

**Include:** A partially drafted institution response section at the end — incomplete enough to make the tool's value immediately obvious

---

## Section 10: Component File Map

```
src/
  app/
    page.tsx                          # Root page, assembles layout
    layout.tsx                        # Root layout with fonts and metadata
    api/
      chat/
        route.ts                      # Streaming chat API route
  components/
    layout/
      TopNav.tsx
    sidebar/
      PromptSidebar.tsx
      PromptCard.tsx
    document/
      DocumentViewer.tsx
      UploadZone.tsx
    chat/
      ChatWindow.tsx
      MessageList.tsx
      UserMessage.tsx
      AssistantMessage.tsx
      ChatInput.tsx
      TypingIndicator.tsx
  lib/
    context/
      AppContext.tsx
    parseDocument.ts
    syntheticMRA.ts
    openai.ts                         # OpenAI client singleton
  styles/
    globals.css
```

---

## Section 11: shadcn Components to Install

```bash
npx shadcn@latest add button
npx shadcn@latest add badge
npx shadcn@latest add textarea
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
npx shadcn@latest add tooltip
```

All shadcn components must be restyled to match the Crowe brand system. Do not use shadcn defaults for colors or border radius in the final output.

---

## Section 12: Additional Dependencies

```bash
npm install openai
npm install ai                        # Vercel AI SDK for streaming
npm install pdfjs-dist                # PDF parsing
npm install react-markdown            # Markdown rendering in chat
npm install remark-gfm                # GitHub Flavored Markdown support
npm install framer-motion             # Motion animations
```

---

## Agent Execution Order

| Order | Agent | Sections |
|-------|-------|----------|
| 1 | **Scaffold Agent** | Sections 11, 12, file structure from Section 10 |
| 2 | **Data Agent** | Sections 6, 7, 8, 9 |
| 3 | **Document Agent** | Section 3 in full |
| 4 | **Chat Agent** | Section 4 in full including streaming |
| 5 | **Sidebar Agent** | Section 2 with all 8 prompts and full card spec |
| 6 | **Layout Agent** | Section 1 + `page.tsx` assembly of all panels |
| 7 | **Animation Agent** | Section 5 in full, audit every component for missing Motion wrappers |
| 8 | **QA Agent** | Full visual audit against this spec, all states (empty/loading/loaded), verified at 1440px viewport |

Phases 1–3 are sequential and blocking. Phases 4 and 5 can run in parallel once Phase 3 is complete. Phase 6 can begin in parallel with Phase 4. Phase 7 begins only after all other phases are complete.

---

## Conflict Resolution

- Every agent must read `CLAUDE.md` before starting work
- Any decision not covered by this spec defaults to `CLAUDE.md`
- If there is a conflict between this spec and `CLAUDE.md`:
  - **This spec wins** for visual, layout, and component decisions
  - **`CLAUDE.md` wins** for code standards, tooling, and deployment decisions
