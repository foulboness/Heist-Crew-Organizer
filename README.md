# BLACKPRINT — Heist Crew Organizer

A kanban board wearing a heist crew's case file as a disguise. Built with Next.js 14 (App Router), TypeScript, dnd-kit, Zustand, and Tailwind CSS.

## What it does

- **Timeline board** — five phase columns (Casing → Prep → Entry → The Score → Exit) hold objective cards. Drag cards within a column to resequence, or across columns to advance the plan. Powered by `@dnd-kit/sortable` with multi-container support.
- **Crew roster** — recruit crew members with a codename, specialty, and heat level. Drag a crew chip straight onto an objective card to assign them; click their avatar on the card to pull them off.
- **Loadout manifest** — track gear with category, cost, and acquired status. Drag a gear tag onto an objective to attach it; the budget strip totals acquired vs. planned spend.
- **Phase ticker** — a live readout of how staffed each phase is, since order in this board carries real meaning (you can't skip Entry to get to The Score).
- **Persisted state** — everything lives in a Zustand store with `persist` middleware, so your plan survives a refresh (stored in `localStorage` under `blackprint-heist-board`).


## Tech Stack

| Technology | Purpose |
| :--------- | :------ |
| **Next.js** | React framework for building full-stack web applications |
| **TypeScript** | Static typing and improved developer experience |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |
| **dnd-kit** | Accessible drag-and-drop toolkit for React |
| **Zustand** | Lightweight global state management |
| **Framer Motion** *(Optional)* | Animations and smooth UI transitions |

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/foulboness/Heist-Crew-Organizer.git
```

### 2. Navigate to the Project Directory

```bash
cd Heist-Crew-Organizer
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Visit the following URL in your browser:

```text
http://localhost:3000
```

---

## Available Scripts

| Command | Description |
| :------ | :---------- |
| `npm install` | Installs all project dependencies |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint to check for code issues |

---

## Requirements

Before running the project, ensure you have the following installed:

- **Node.js** (v20 or newer recommended)
- **npm** (included with Node.js)
- A modern web browser (Chrome, Edge, Firefox, or Brave)
- Visual Studio Code (recommended)

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
