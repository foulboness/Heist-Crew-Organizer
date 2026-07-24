"use client";

import { useDraggable } from "@dnd-kit/core";
import type { CrewMember } from "@/types";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CrewAvatar({ member, size = 28 }: { member: CrewMember; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full border font-display text-xs tracking-wide"
      style={{
        width: size,
        height: size,
        color: member.color,
        borderColor: member.color + "80",
        backgroundColor: member.color + "1a",
      }}
      title={member.codename}
    >
      {initials(member.codename)}
    </div>
  );
}

export default function CrewChip({
  member,
  onRemove,
}: {
  member: CrewMember;
  onRemove?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `crew-source-${member.id}`,
    data: { type: "crew", crewId: member.id },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group flex cursor-grab items-center gap-2.5 border border-ink-600 bg-ink-800/70 px-2.5 py-2 transition active:cursor-grabbing ${
        isDragging ? "opacity-30" : "hover:border-blue-dim hover:bg-ink-700/60"
      }`}
    >
      <CrewAvatar member={member} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm tracking-wide text-paper">{member.codename}</p>
        <p className="truncate text-[10px] uppercase tracking-[0.12em] text-paper-dim">
          {member.specialty}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-[10px] tabular-nums ${
            member.heat > 55 ? "text-redact" : member.heat > 30 ? "text-gold-bright" : "text-blue-soft"
          }`}
          title="Heat level"
        >
          {member.heat}° heat
        </span>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(member.id);
          }}
          className="hidden text-paper-dim hover:text-redact group-hover:block"
          title="Cut from crew"
        >
          ×
        </button>
      )}
    </div>
  );
}
