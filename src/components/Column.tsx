"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import type { Column as ColumnType, JobCard as JobCardType } from "@/types";
import { useCrewStore } from "@/store/useCrewStore";
import JobCard from "./JobCard";

export default function Column({ column, jobs }: { column: ColumnType; jobs: JobCardType[] }) {
  const addJob = useCrewStore((s) => s.addJob);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  });

  const sorted = [...jobs].sort((a, b) => a.order - b.order);

  return (
    <div className="flex w-[300px] shrink-0 flex-col">
      <div className="mb-2 flex items-baseline justify-between border-b border-ink-600 pb-2">
        <div>
          <h2 className="font-display text-xl tracking-[0.06em] text-paper">{column.title}</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-blue-soft/70">{column.subtitle}</p>
        </div>
        <span className="font-mono text-xs text-paper-dim">{String(sorted.length).padStart(2, "0")}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-[140px] flex-1 flex-col gap-2 rounded-sm p-1 transition-colors ${
          isOver ? "bg-blue-dim/10 outline-dashed outline-1 outline-blue-print/40" : ""
        }`}
      >
        <SortableContext items={sorted.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {sorted.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </SortableContext>

        {adding ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              if (title.trim()) addJob(column.id, title.trim());
              setTitle("");
              setAdding(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") {
                setTitle("");
                setAdding(false);
              }
            }}
            placeholder="New objective…"
            className="border border-blue-dim bg-ink-800/70 p-2 text-sm text-paper outline-none placeholder:text-paper-dim/60"
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="mt-1 border border-dashed border-ink-600 py-2 text-[11px] uppercase tracking-[0.15em] text-paper-dim transition hover:border-blue-dim hover:text-blue-soft"
          >
            + Add objective
          </button>
        )}
      </div>
    </div>
  );
}
