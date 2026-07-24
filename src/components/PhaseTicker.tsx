"use client";

import { useMemo } from "react";
import { useCrewStore } from "@/store/useCrewStore";

export default function PhaseTicker() {
  const columns = useCrewStore((s) => s.columns);
  const jobs = useCrewStore((s) => s.jobs);

  const sorted = useMemo(() => [...columns].sort((a, b) => a.order - b.order), [columns]);

  return (
    <div className="mb-5 flex items-center overflow-x-auto border border-ink-600 bg-ink-800/40 px-4 py-3">
      {sorted.map((col, i) => {
        const colJobs = jobs.filter((j) => j.columnId === col.id);
        const withCrew = colJobs.filter((j) => j.assignedCrewIds.length > 0).length;
        const staffed = colJobs.length > 0 && withCrew === colJobs.length;
        return (
          <div key={col.id} className="flex shrink-0 items-center">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  staffed ? "bg-gold" : colJobs.length ? "bg-blue-print" : "bg-ink-600"
                }`}
              />
              <div className="leading-tight">
                <p className="font-display text-sm tracking-wide text-paper">{col.title}</p>
                <p className="font-mono text-[10px] text-paper-dim">
                  {withCrew}/{colJobs.length} staffed
                </p>
              </div>
            </div>
            {i < sorted.length - 1 && (
              <svg width="46" height="8" className="mx-3 shrink-0 text-ink-600">
                <line x1="0" y1="4" x2="46" y2="4" stroke="currentColor" strokeWidth="1.5" className="dash-flow" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
