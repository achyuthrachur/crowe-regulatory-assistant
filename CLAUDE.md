# CLAUDE.md - Master Project Configuration

> Loaded automatically by Claude Code at the start of every session.
> Design system details (typography, color, animation, layout) live in `.claude/rules/frontend-design.md`.

---

## SECTION A: UNIVERSAL PROJECT STANDARDS

---

### 1. AGENT & TASK MANAGEMENT

**Use subagents** for exploration/research tasks to preserve main context:
- Codebase exploration (reading many files)
- Research that doesn't require immediate action
- Parallel investigation of multiple approaches

**Don't use subagents** for simple edits, direct implementation, or when you need context continuity.

**Task pattern for new features:**
Define (acceptance criteria) → Design (architecture) → Implement → Test → Review → Deploy

---

### 2. DEVELOPMENT STANDARDS

#### 2.1 Default Stack

```
Framework:     Next.js 14+ (App Router, TypeScript)
Styling:       Tailwind CSS + CSS Variables
Components:    shadcn/ui (always restyle beyond defaults)
Animation:     Motion (framer-motion) for React, CSS for simple effects
State:         React Context + Zustand (if needed)
Database:      Prisma + PostgreSQL (Vercel Postgres/Supabase)
Auth:          NextAuth.js or Clerk
Testing:       Vitest + React Testing Library
Deployment:    Vercel
Icons:         Lucide React
```

#### 2.2 Code Style

**TypeScript:**
- Use `interface` for object shapes, `type` for unions/intersections
- Always type function parameters and return values
- Never use `any` — avoid type assertions unless absolutely necessary

**React:**
- Functional components with TypeScript props interfaces
- Use named exports (not default exports)
- Colocate styles, tests, and components

**File naming:**
- PascalCase for components: `Button/Button.tsx`, `Button/index.ts`
- kebab-case for routes: `app/dashboard/page.tsx`

#### 2.3 Git Workflow

**Branch naming:** `feature/[ticket]-description`, `bugfix/[ticket]-description`, `hotfix/`, `refactor/`

**Commits:** Conventional Commits format (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`)

**Before every commit:** `npm run lint && npm run typecheck && npm run test`

**Pre-commit hooks:** Use Husky + lint-staged to auto-run ESLint and Prettier on staged files.

#### 2.4 Quality Gates (Before Merging PRs)

- All tests pass
- TypeScript has no errors
- ESLint has no errors
- Preview deployment works
- Lighthouse > 90 (Performance, Accessibility)
- No console errors
- Responsive design verified (mobile, tablet, desktop)

---

### 3. DEPLOYMENT (VERCEL)

**GitHub username:** `achyuthrachur`

**New project setup:**
```bash
gh repo create achyuthrachur/[project-name] --public --source=. --remote=origin --push
vercel link
vercel env pull .env.local
```

**Deploy:** `vercel` (preview) / `vercel --prod` (production)

**CI/CD:** Create `.github/workflows/ci.yml` (lint + typecheck + test + build on PRs) and `.github/workflows/deploy.yml` (auto-deploy to Vercel on push to main).

**Required GitHub secrets for Vercel deployment:**
- `VERCEL_TOKEN` — from Account Settings > Tokens
- `VERCEL_ORG_ID` — from `.vercel/project.json`
- `VERCEL_PROJECT_ID` — from `.vercel/project.json`

---

### 4. NEW PROJECT INITIALIZATION

```bash
# 1. Create project
npx create-next-app@latest [name] --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd [name]

# 2. Core dependencies
npx shadcn@latest init
npm install motion                    # Animation (Motion/Framer Motion)
npm install -D husky lint-staged prettier

# 3. Linting & formatting
npx husky init
echo "npx lint-staged" > .husky/pre-commit
# Add lint-staged config to package.json

# 4. GitHub + Vercel
git add . && git commit -m "feat: initial project setup"
gh repo create achyuthrachur/[name] --public --source=. --remote=origin --push
vercel link

# 5. CI/CD
mkdir -p .github/workflows
# Create ci.yml and deploy.yml
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID

# 6. Copy CLAUDE.md and .claude/rules/ to project root
```

**Verify:** `npm run dev` ✅ / `npm run build` ✅ / `npm run lint` ✅ / `vercel` ✅

---

### 5. CONFIGURATION DEFAULTS

**Prettier:** 2-space tabs, single quotes, semicolons, trailing commas (es5), 100 char width, `prettier-plugin-tailwindcss`

**ESLint:** Extend `next/core-web-vitals` + `next/typescript`. Rules: no unused vars (ignore `_` prefix), no explicit `any`, prefer const.

**TSConfig:** Use default from create-next-app with `@/*` path alias to `./src/*`.

---

### 6. CROWE BRAND SYSTEM

> This is the authoritative brand reference. The frontend design rules file (`.claude/rules/frontend-design.md`) defers to these colors and fonts by default.

#### 6.1 Brand Typography

**Primary font family:** Helvetica Now
- **Headings:** Helvetica Now Display Bold
- **Subheadings:** Helvetica Now Text Bold
- **Body:** Helvetica Now Text Regular
- **Fallbacks (when Helvetica Now unavailable):** Helvetica Neue, Helvetica, Arial, sans-serif

Do not use non-brand-compliant fonts on Crowe projects. Maintain proper line spacing and letter spacing for readability.

#### 6.2 Primary Colors (foundation of brand identity — should dominate)

| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| **Crowe Indigo Dark** | `#011E41` | 1, 30, 65 | Primary backgrounds, headings, dominant brand color |
| **Crowe Indigo Core** | `#002E62` | 0, 46, 98 | Secondary brand usage |
| **Crowe Indigo Bright** | `#003F9F` | 0, 63, 159 | Lighter indigo applications |
| **Crowe Amber Core** | `#F5A800` | 245, 168, 0 | Primary accent, CTAs, highlights |
| **Crowe Amber Bright** | `#FFD231` | 255, 210, 49 | Light amber variant |
| **Crowe Amber Dark** | `#D7761D` | 215, 118, 29 | Dark amber variant |

#### 6.3 Secondary Colors (complement primaries — must NOT dominate)

| Name | HEX | Bright | Dark |
|------|-----|--------|------|
| **Teal** | `#05AB8C` | `#16D9BC` | `#0C7876` |
| **Cyan** | `#54C0E8` | `#8FE1FF` | `#007DA3` |
| **Blue** | `#0075C9` | `#32A8FD` | `#0050AD` |
| **Violet** | `#B14FC5` | `#EA80FF` | `#612080` |
| **Coral** | `#E5376B` | `#FF526F` | `#992A5C` |

#### 6.4 Neutral Tints

| Usage | HEX |
|-------|-----|
| White | `#FFFFFF` |
| Dark text | `#333333` |
| Secondary text | `#4F4F4F` |
| Muted text | `#828282` |
| Light border | `#BDBDBD` |
| Light background | `#E0E0E0` |
| Black (use sparingly) | `#000000` |

#### 6.5 Brand Color Rules

- Crowe Indigo and Crowe Amber must be the dominant colors across all Crowe assets
- Secondary colors add depth but must never overshadow primary colors
- Do NOT use secondary colors for text
- Do NOT use secondary colors as full backgrounds
- Do NOT use gradients as backgrounds (gradients only in SmartPath, data viz, infographics)
- Do NOT use large areas of pure black
- Do NOT use low-contrast text/background combinations
- Always meet WCAG accessibility contrast requirements
- White is essential for contrast, clarity, and balance

---

## SECTION B: PROJECT-SPECIFIC CONFIGURATION

> Fill this section when starting a new project. Overrides Section A where conflicts exist.

### Project Overview

| Field | Value |
|-------|-------|
| **Name** | `[PROJECT_NAME]` |
| **Description** | [Brief description] |
| **Type** | [SaaS / Marketing / Dashboard / E-commerce / Portfolio] |
| **Repository** | `https://github.com/achyuthrachur/[PROJECT_NAME]` |
| **Production URL** | `https://[PROJECT_NAME].vercel.app` |

### Stack Deviations

> Only list if different from defaults in Section A

### Color Palette Override

> Only if using project-specific colors instead of Crowe brand defaults (defined in global `~/.claude/CLAUDE.md`)

```css
:root {
  --color-brand: #______;
  --color-accent-primary: #______;
  --color-accent-secondary: #______;
}
```

### Project-Specific Commands

```bash
# Add any project-specific commands here
```

### Key Architecture Decisions

```
src/
  app/
    (routes)/         # Route groups
    api/              # API routes
  components/
    ui/               # Reusable UI components
    features/         # Feature-specific components
  lib/
    utils.ts          # Utility functions
    db.ts             # Database client
  styles/
    globals.css       # Global styles & CSS variables
```

### Environment Variables

```env
DATABASE_URL=
NEXT_PUBLIC_[VAR]=
```

### Known Issues & Workarounds

| Issue | Workaround | Status |
|-------|------------|--------|
| [Description] | [Fix] | 🔴/🟢 |

### External Integrations

| Service | Purpose | Docs |
|---------|---------|------|
| [Service] | [Use] | [Link] |
