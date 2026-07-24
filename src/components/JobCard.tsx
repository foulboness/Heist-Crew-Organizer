"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { JobCard as JobCardType, Risk } from "@/types";
import { useCrewStore, riskColor } from "@/store/useCrewStore";
import { CrewAvatar } from "./CrewChip";
import GearTag from "./GearTag";

const risks: Risk[] = ["Low", "Moderate", "High", "Critical"];

export default function JobCard({ job }: { job: JobCardType }) {
  const crew = useCrewStore((s) => s.crew);
  const gear = useCrewStore((s) => s.gear);
  const updateJob = useCrewStore((s) => s.updateJob);
  const removeJob = useCrewStore((s) => s.removeJob);
  const setJobRisk = useCrewStore((s) => s.setJobRisk);
  const unassignCrewFromJob = useCrewStore((s) => s.unassignCrewFromJob);
  const detachGearFromJob = useCrewStore((s) => s.detachGearFromJob);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(job.title);
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id,
    data: { type: "job", columnId: job.columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignedCrew = job.assignedCrewIds.map((id) => crew.find((c) => c.id === id)).filter(Boolean);
  const attachedGear = job.gearIds.map((id) => gear.find((g) => g.id === id)).filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`crosshair-corners group relative border bg-ink-800/80 p-3 shadow-card transition-shadow ${
        isDragging ? "drag-ghost opacity-40" : "border-ink-600 hover:shadow-card-hover"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div
          {...attributes}
          {...listeners}
          className="flex-1 cursor-grab select-none active:cursor-grabbing"
        >
          {editing ? (
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => {
                updateJob(job.id, { title: draft || "Untitled objective" });
                setEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              className="w-full border-b border-blue-print bg-transparent font-display text-base tracking-wide text-paper outline-none"
              onPointerDown={(e) => e.stopPropagation()}
            />
          ) : (
            <h3
              onDoubleClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              className="font-display text-base leading-tight tracking-wide text-paper"
            >
              {job.title}
            </h3>
          )}
          <p className="mt-0.5 font-mono text-[10px] text-blue-soft/80">{job.eta}</p>
        </div>
        <button
          onClick={() => removeJob(job.id)}
          className="hidden shrink-0 text-paper-dim hover:text-redact group-hover:block"
          title="Scrap this objective"
        >
          ×
        </button>
      </div>

      {job.detail && <p className="mb-2 text-xs leading-snug text-paper-dim">{job.detail}</p>}

      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <select
          value={job.risk}
          onChange={(e) => setJobRisk(job.id, e.target.value as Risk)}
          className={`border px-1.5 py-0.5 text-[10px] uppercase tracking-wide outline-none ${riskColor(job.risk)}`}
        >
          {risks.map((r) => (
            <option key={r} value={r} className="bg-ink-900 text-paper">
              {r}
            </option>
          ))}
        </select>
        {attachedGear.map(
          (g) => g && <GearTag key={g.id} item={g} compact onRemove={() => detachGearFromJob(job.id, g.id)} />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {assignedCrew.length === 0 && (
            <span className="text-[10px] italic text-paper-dim/70">unassigned — drop crew here</span>
          )}
          {assignedCrew.map(
            (c) =>
              c && (
                <button
                  key={c.id}
                  onClick={() => unassignCrewFromJob(job.id, c.id)}
                  title={`${c.codename} — click to pull off this job`}
                  className="ring-2 ring-ink-800 transition hover:scale-110 hover:ring-redact"
                >
                  <CrewAvatar member={c} size={24} />
                </button>
              )
          )}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[10px] uppercase tracking-[0.15em] text-paper-dim hover:text-blue-soft"
        >
          {open ? "Hide detail" : "Detail"}
        </button>
      </div>

      {open && (
        <div className="mt-2 border-t border-ink-600 pt-2">
          <textarea
            value={job.detail}
            onChange={(e) => updateJob(job.id, { detail: e.target.value })}
            placeholder="Add operational notes…"
            rows={2}
            className="w-full resize-none border border-ink-600 bg-ink-900/60 p-1.5 text-xs text-paper outline-none placeholder:text-paper-dim/60 focus:border-blue-dim"
          />
        </div>
      )}
    </div>
  );
}
