# Mini Seller Console

Mini Seller Console is a lightweight React + TypeScript + Vite application built as a demo for lead triage and conversion to opportunities. It showcases a small, well-structured frontend app with a strong focus on UX, theming (light/dark), and resilient in-memory data handling for interview and portfolio review.

This README is written to help recruiters and technical reviewers quickly understand the project, how it is organized, and where to look for key implementation details.

---

## Quick Summary

- Stack: React 19 + TypeScript + Vite
- Styling: Tailwind CSS (v4) + custom CSS variables for theming
- State & Storage: local component state, context for theme, localStorage for persistence
- Data: In-memory repositories that read `public/leads.json` and simulate latency/failures (used for optimistic updates and rollback)

---

## Live locally (fast)

1. Install dependencies:

```powershell
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

Open the URL printed by Vite (e.g. `http://localhost:5173`).

Build for production:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

---

## Project goals & implemented features

- Leads list with search, filtering, and sorting
- Slide-over lead detail panel with inline editing and simple validation
- Convert lead → opportunity flow (in-memory) with timeline updates
- Optimistic UI updates and rollback on simulated repository failure
- Responsive layout (cards on mobile, table on desktop)
- Light and dark themes implemented via CSS variables and a ThemeContext provider
- Accessibility-minded markup and keyboard focus handling for dialogs

---

## Folder structure (high level)

- `src/`

  - `app/` – domain/use-case logic (convert lead use case)
  - `infra/` – repositories and adapters (in-memory repo implementations)
  - `ui/`
    - `components/` – reusable UI pieces (header, statistics, lead list, detail panel)
    - `pages/` – page-level components (LeadsPage)
    - `hooks/` – custom hooks (useLeads, useLeadFilters, useLeadData)
  - `contexts/` – `ThemeContext` and theme helpers
  - `main.tsx` – app entry

- `public/` – static assets and `leads.json` (seed data)
- `index.css` – Tailwind import plus CSS variables theme system and glassmorphism utilities
- `vite.config.ts`, `tsconfig.json`, ESLint/Tailwind configs

Refer to the source for exact file locations and smaller helpers used across components.

---

## Theming and visual system

- Tailwind v4 is used for utility classes but dark-mode was implemented using a custom CSS variable approach to avoid conflicts with Tailwind v4 dark utilities. The application exposes a `ThemeContext` + `useTheme` hook to toggle and persist theme to `localStorage`.
- Colors, borders, and icon backgrounds are mapped to CSS variables in `src/index.css` (e.g. `--bg-primary`, `--text-primary`, `--icon-bg-blue`). A `.dark` class applied to the document root flips the variable set.
- Glassmorphism: additional utilities like `.glass-effect` and `.glass-card` were added to produce a modern frosted-glass UI with `backdrop-filter` and subtle borders.

---

## Data layer and behavior

- Data is intentionally in-memory for this demo: see `src/infra/memory/LeadRepoMemory.ts` and `OppRepoMemory.ts`.
- `public/leads.json` contains seed data. The memory repo simulates latency and occasional failures so the UI demonstrates optimistic updates + rollback logic.
- The convert flow is implemented as a use-case in `src/app` and wired to the UI via hooks.

---

## Key implementation notes (what to highlight during interviews)

- Theme implementation: explain why CSS variables+document class were used instead of Tailwind dark utilities (compatibility with Tailwind v4 and reliable runtime switching).
- Optimistic updates: how the memory repo simulates failures and how rollback is handled in the UI.
- Component structure and separation of concerns: domain/use-case vs infra vs ui.
- Accessibility and keyboard interactions for the slide-over panel.
- Performance considerations and next steps (virtualization for large datasets, memoization).

---

## Suggestions for follow-ups and improvements

- Add unit and integration tests (Vitest + React Testing Library) for domain logic and critical components.
- Add e2e tests (Playwright) to cover user flows like search, filter, convert.
- Introduce a small backend or mock server (msw) and swap the in-memory repo with an HTTP adapter.
- Add CI (GitHub Actions) with lint, typecheck, and tests.

---

## For recruiters — quick talking points

- Candidate: Jeremias Marinho — Full-stack developer
- Project demonstrates UI craftsmanship with modern CSS (glassmorphism), theme persistence, and UX details (skeletons, empty & error states).
- Strong focus areas to ask about in an interview:
  - Theme design decisions and implementation
  - How optimistic updates and rollback are implemented and tested
  - Component composition and separation of domain logic
  - Performance trade-offs and potential scaling strategies

---


Author: Jeremias Marinho
