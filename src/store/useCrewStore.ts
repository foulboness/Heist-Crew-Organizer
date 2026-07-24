import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Column, CrewMember, GearItem, JobCard, Risk } from "@/types";

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const seedColumns: Column[] = [
  { id: "col-casing", title: "Casing", subtitle: "Recon & intel", order: 0 },
  { id: "col-prep", title: "Prep", subtitle: "Recruit & rig", order: 1 },
  { id: "col-entry", title: "Entry", subtitle: "Breach & access", order: 2 },
  { id: "col-score", title: "The Score", subtitle: "Vault time", order: 3 },
  { id: "col-exit", title: "Exit", subtitle: "Clean getaway", order: 4 },
];

const seedCrew: CrewMember[] = [
  {
    id: uid("crew"),
    codename: "Ferro",
    specialty: "Safecracker",
    heat: 22,
    cut: 20,
    color: "#3FA0E8",
    bio: "Ex-vault engineer. Reads a lock like sheet music.",
  },
  {
    id: uid("crew"),
    codename: "Wisp",
    specialty: "Hacker",
    heat: 41,
    cut: 15,
    color: "#D4A72C",
    bio: "Ghosts through firewalls. Allergic to backdoors that aren't hers.",
  },
  {
    id: uid("crew"),
    codename: "Blackout",
    specialty: "Muscle",
    heat: 63,
    cut: 15,
    color: "#C1443A",
    bio: "Handles complications. Prefers not to.",
  },
  {
    id: uid("crew"),
    codename: "Marlowe",
    specialty: "Face",
    heat: 12,
    cut: 15,
    color: "#7EC3F5",
    bio: "Talks guards into becoming temporary friends.",
  },
  {
    id: uid("crew"),
    codename: "Tread",
    specialty: "Driver",
    heat: 30,
    cut: 15,
    color: "#F0C550",
    bio: "Never taken the same route twice. Never been caught either.",
  },
  {
    id: uid("crew"),
    codename: "Vantage",
    specialty: "Lookout",
    heat: 8,
    cut: 10,
    color: "#8FD6A6",
    bio: "Sees the block before the block sees itself.",
  },
];

const seedGear: GearItem[] = [
  { id: uid("gear"), name: "Laser Scope Kit", category: "Entry", cost: 4200, acquired: true },
  { id: uid("gear"), name: "RFID Cloner", category: "Tech", cost: 1800, acquired: true },
  { id: uid("gear"), name: "Signal Jammer", category: "Comms", cost: 2600, acquired: false },
  { id: uid("gear"), name: "Guard Uniforms x4", category: "Disguise", cost: 900, acquired: true },
  { id: uid("gear"), name: "Getaway Van, reinforced", category: "Transport", cost: 15000, acquired: false },
  { id: uid("gear"), name: "Thermite Charges", category: "Ordnance", cost: 5200, acquired: false },
  { id: uid("gear"), name: "Earpiece Comms x6", category: "Comms", cost: 1100, acquired: true },
  { id: uid("gear"), name: "Drill Rig, diamond bit", category: "Entry", cost: 7800, acquired: false },
];

const seedJobs: JobCard[] = [
  {
    id: uid("job"),
    columnId: "col-casing",
    title: "Map vault sub-level",
    detail: "Cross-reference blueprints against the '09 renovation permits.",
    risk: "Low",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-minus 6d",
    order: 0,
  },
  {
    id: uid("job"),
    columnId: "col-casing",
    title: "Shadow the shift change",
    detail: "Confirm the 22:40 guard rotation holds for a full week.",
    risk: "Low",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-minus 5d",
    order: 1,
  },
  {
    id: uid("job"),
    columnId: "col-prep",
    title: "Forge maintenance badges",
    detail: "Need clean plastic and a printer that doesn't ask questions.",
    risk: "Moderate",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-minus 3d",
    order: 0,
  },
  {
    id: uid("job"),
    columnId: "col-entry",
    title: "Clone the loading dock RFID",
    detail: "One pass within two meters is all it takes.",
    risk: "Moderate",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-minus 0d, 22:10",
    order: 0,
  },
  {
    id: uid("job"),
    columnId: "col-score",
    title: "Crack the mantrap vault",
    detail: "Six-wheel combo, tolerance under a hair's width.",
    risk: "Critical",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-minus 0d, 23:40",
    order: 0,
  },
  {
    id: uid("job"),
    columnId: "col-exit",
    title: "Ditch the van at Pier 9",
    detail: "Swap plates, torch the interior, walk two blocks separate.",
    risk: "High",
    assignedCrewIds: [],
    gearIds: [],
    eta: "T-plus 0d, 00:20",
    order: 0,
  },
];

interface CrewStore {
  columns: Column[];
  crew: CrewMember[];
  gear: GearItem[];
  jobs: JobCard[];

  moveJob: (jobId: string, toColumnId: string, toIndex: number) => void;
  reorderWithinColumn: (columnId: string, activeId: string, overId: string) => void;
  addJob: (columnId: string, title: string) => void;
  removeJob: (jobId: string) => void;
  updateJob: (jobId: string, patch: Partial<JobCard>) => void;
  setJobRisk: (jobId: string, risk: Risk) => void;

  assignCrewToJob: (jobId: string, crewId: string) => void;
  unassignCrewFromJob: (jobId: string, crewId: string) => void;

  attachGearToJob: (jobId: string, gearId: string) => void;
  detachGearFromJob: (jobId: string, gearId: string) => void;

  addCrew: (member: Omit<CrewMember, "id">) => void;
  removeCrew: (crewId: string) => void;

  addGear: (item: Omit<GearItem, "id">) => void;
  toggleGearAcquired: (gearId: string) => void;
  removeGear: (gearId: string) => void;

  resetBoard: () => void;
}

export const useCrewStore = create<CrewStore>()(
  persist(
    (set, get) => ({
      columns: seedColumns,
      crew: seedCrew,
      gear: seedGear,
      jobs: seedJobs,

      moveJob: (jobId, toColumnId, toIndex) => {
        set((state) => {
          const job = state.jobs.find((j) => j.id === jobId);
          if (!job) return state;
          const withoutJob = state.jobs.filter((j) => j.id !== jobId);
          const destJobs = withoutJob
            .filter((j) => j.columnId === toColumnId)
            .sort((a, b) => a.order - b.order);
          destJobs.splice(toIndex, 0, { ...job, columnId: toColumnId });
          const renumbered = destJobs.map((j, i) => ({ ...j, order: i }));
          const others = withoutJob.filter((j) => j.columnId !== toColumnId);
          return { jobs: [...others, ...renumbered] };
        });
      },

      reorderWithinColumn: (columnId, activeId, overId) => {
        set((state) => {
          const colJobs = state.jobs
            .filter((j) => j.columnId === columnId)
            .sort((a, b) => a.order - b.order);
          const others = state.jobs.filter((j) => j.columnId !== columnId);
          const fromIdx = colJobs.findIndex((j) => j.id === activeId);
          const toIdx = colJobs.findIndex((j) => j.id === overId);
          if (fromIdx === -1 || toIdx === -1) return state;
          const reordered = [...colJobs];
          const [moved] = reordered.splice(fromIdx, 1);
          reordered.splice(toIdx, 0, moved);
          const renumbered = reordered.map((j, i) => ({ ...j, order: i }));
          return { jobs: [...others, ...renumbered] };
        });
      },

      addJob: (columnId, title) => {
        set((state) => {
          const colJobs = state.jobs.filter((j) => j.columnId === columnId);
          const newJob: JobCard = {
            id: uid("job"),
            columnId,
            title: title || "Untitled objective",
            detail: "",
            risk: "Low",
            assignedCrewIds: [],
            gearIds: [],
            eta: "TBD",
            order: colJobs.length,
          };
          return { jobs: [...state.jobs, newJob] };
        });
      },

      removeJob: (jobId) => set((state) => ({ jobs: state.jobs.filter((j) => j.id !== jobId) })),

      updateJob: (jobId, patch) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, ...patch } : j)),
        })),

      setJobRisk: (jobId, risk) =>
        set((state) => ({ jobs: state.jobs.map((j) => (j.id === jobId ? { ...j, risk } : j)) })),

      assignCrewToJob: (jobId, crewId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId && !j.assignedCrewIds.includes(crewId)
              ? { ...j, assignedCrewIds: [...j.assignedCrewIds, crewId] }
              : j
          ),
        })),

      unassignCrewFromJob: (jobId, crewId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId
              ? { ...j, assignedCrewIds: j.assignedCrewIds.filter((c) => c !== crewId) }
              : j
          ),
        })),

      attachGearToJob: (jobId, gearId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId && !j.gearIds.includes(gearId)
              ? { ...j, gearIds: [...j.gearIds, gearId] }
              : j
          ),
        })),

      detachGearFromJob: (jobId, gearId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, gearIds: j.gearIds.filter((g) => g !== gearId) } : j
          ),
        })),

      addCrew: (member) =>
        set((state) => ({ crew: [...state.crew, { ...member, id: uid("crew") }] })),

      removeCrew: (crewId) =>
        set((state) => ({
          crew: state.crew.filter((c) => c.id !== crewId),
          jobs: state.jobs.map((j) => ({
            ...j,
            assignedCrewIds: j.assignedCrewIds.filter((id) => id !== crewId),
          })),
        })),

      addGear: (item) => set((state) => ({ gear: [...state.gear, { ...item, id: uid("gear") }] })),

      toggleGearAcquired: (gearId) =>
        set((state) => ({
          gear: state.gear.map((g) => (g.id === gearId ? { ...g, acquired: !g.acquired } : g)),
        })),

      removeGear: (gearId) =>
        set((state) => ({
          gear: state.gear.filter((g) => g.id !== gearId),
          jobs: state.jobs.map((j) => ({ ...j, gearIds: j.gearIds.filter((id) => id !== gearId) })),
        })),

      resetBoard: () => set({ columns: seedColumns, crew: seedCrew, gear: seedGear, jobs: seedJobs }),
    }),
    { name: "blackprint-heist-board" }
  )
);

export function riskColor(risk: Risk) {
  switch (risk) {
    case "Low":
      return "text-blue-soft border-blue-dim bg-blue-dim/30";
    case "Moderate":
      return "text-gold-bright border-gold-dim bg-gold-dim/40";
    case "High":
      return "text-orange-300 border-orange-900/60 bg-orange-950/40";
    case "Critical":
      return "text-redact border-redact-dim bg-redact-dim/50";
  }
}
