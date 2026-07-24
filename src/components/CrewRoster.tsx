"use client";

import { useState } from "react";
import { useCrewStore } from "@/store/useCrewStore";
import CrewChip from "./CrewChip";
import type { Specialty } from "@/types";

const specialties: Specialty[] = [
  "Face",
  "Muscle",
  "Hacker",
  "Driver",
  "Safecracker",
  "Lookout",
  "Demolitions",
  "Inside Man",
];

const palette = ["#3FA0E8", "#D4A72C", "#C1443A", "#7EC3F5", "#F0C550", "#8FD6A6", "#C58FE0"];

export default function CrewRoster() {
  const crew = useCrewStore((s) => s.crew);
  const addCrew = useCrewStore((s) => s.addCrew);
  const removeCrew = useCrewStore((s) => s.removeCrew);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState<Specialty>("Muscle");

  const submit = () => {
    if (!name.trim()) return;
    addCrew({
      codename: name.trim(),
      specialty,
      heat: Math.floor(Math.random() * 40) + 5,
      cut: 10,
      color: palette[crew.length % palette.length],
      bio: "New recruit. Untested.",
    });
    setName("");
    setShowForm(false);
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-lg tracking-[0.08em] text-paper">The Crew</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[11px] uppercase tracking-[0.15em] text-blue-soft hover:text-blue-print"
        >
          {showForm ? "Cancel" : "+ Recruit"}
        </button>
      </div>
      <p className="mb-3 text-[11px] leading-snug text-paper-dim">
        Drag a codename onto an objective to put them on the job.
      </p>

      {showForm && (
        <div className="mb-3 space-y-2 border border-ink-600 bg-ink-800/60 p-2.5 animate-riseIn">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Codename"
            className="w-full border border-ink-600 bg-ink-900/70 p-1.5 text-sm text-paper outline-none placeholder:text-paper-dim/60 focus:border-blue-dim"
          />
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value as Specialty)}
            className="w-full border border-ink-600 bg-ink-900/70 p-1.5 text-sm text-paper outline-none focus:border-blue-dim"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={submit}
            className="w-full border border-gold-dim bg-gold-dim/30 py-1.5 text-[11px] uppercase tracking-[0.15em] text-gold-bright hover:bg-gold-dim/50"
          >
            Sign them on
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        {crew.map((member) => (
          <CrewChip key={member.id} member={member} onRemove={removeCrew} />
        ))}
        {crew.length === 0 && (
          <p className="border border-dashed border-ink-600 p-3 text-center text-[11px] text-paper-dim">
            No crew signed on yet.
          </p>
        )}
      </div>
    </section>
  );
}
