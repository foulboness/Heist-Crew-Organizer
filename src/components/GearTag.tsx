"use client";

import { useDraggable } from "@dnd-kit/core";
import type { GearItem } from "@/types";

const categoryColor: Record<string, string> = {
  Tech: "border-blue-dim text-blue-soft",
  Entry: "border-gold-dim text-gold-bright",
  Transport: "border-emerald-900 text-emerald-300",
  Disguise: "border-purple-900 text-purple-300",
  Ordnance: "border-redact-dim text-redact",
  Comms: "border-cyan-900 text-cyan-300",
};

export default function GearTag({
  item,
  onToggle,
  onRemove,
  compact = false,
}: {
  item: GearItem;
  onToggle?: (id: string) => void;
  onRemove?: (id: string) => void;
  compact?: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `gear-source-${item.id}`,
    data: { type: "gear", gearId: item.id },
  });

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${categoryColor[item.category]}`}
      >
        {item.name}
      </span>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group flex cursor-grab items-center gap-2 border border-ink-600 bg-ink-800/70 px-2.5 py-2 transition active:cursor-grabbing ${
        isDragging ? "opacity-30" : "hover:border-gold-dim hover:bg-ink-700/60"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.(item.id);
        }}
        className={`h-3.5 w-3.5 shrink-0 border ${
          item.acquired ? "border-gold bg-gold" : "border-paper-dim"
        }`}
        title={item.acquired ? "Acquired" : "Mark as acquired"}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-paper">{item.name}</p>
        <p className={`truncate text-[10px] uppercase tracking-[0.12em] ${categoryColor[item.category].split(" ")[1]}`}>
          {item.category} · ${item.cost.toLocaleString()}
        </p>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="hidden text-paper-dim hover:text-redact group-hover:block"
          title="Drop from manifest"
        >
          ×
        </button>
      )}
    </div>
  );
}
