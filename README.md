# BLACKPRINT — Heist Crew Organizer

A kanban board wearing a heist crew's case file as a disguise. Built with Next.js 14 (App Router), TypeScript, dnd-kit, Zustand, and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What it does

- **Timeline board** — five phase columns (Casing → Prep → Entry → The Score → Exit) hold objective cards. Drag cards within a column to resequence, or across columns to advance the plan. Powered by `@dnd-kit/sortable` with multi-container support.
- **Crew roster** — recruit crew members with a codename, specialty, and heat level. Drag a crew chip straight onto an objective card to assign them; click their avatar on the card to pull them off.
- **Loadout manifest** — track gear with category, cost, and acquired status. Drag a gear tag onto an objective to attach it; the budget strip totals acquired vs. planned spend.
- **Phase ticker** — a live readout of how staffed each phase is, since order in this board carries real meaning (you can't skip Entry to get to The Score).
- **Persisted state** — everything lives in a Zustand store with `persist` middleware, so your plan survives a refresh (stored in `localStorage` under `blackprint-heist-board`).

## Structure

```
src/
  app/            Next.js App Router shell, global styles, fonts
  components/     Board, Column, JobCard, CrewChip, GearTag, sidebars, header
  store/          Zustand store (crew, gear, columns, jobs) + actions
  types/          Shared TypeScript types
```

## Design notes

Palette and type are custom-tokened in `tailwind.config.ts` (ink/blue-print/gold/redact/paper) to read as a blueprint dossier rather than a generic dark theme. Fonts are loaded via `next/font/google`: Bebas Neue for display type, IBM Plex Mono for body/data, and Special Elite for the odd typewritten flourish.
