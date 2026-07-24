"use client";

import { useState } from "react";
import { useCrewStore } from "@/store/useCrewStore";
import GearTag from "./GearTag";
import type { GearCategory } from "@/types";

const categories: GearCategory[] = ["Tech", "Entry", "Transport", "Disguise", "Ordnance", "Comms"];

export default function LoadoutPanel() {
  const gear = useCrewStore((s) => s.gear);
  const addGear = useCrewStore((s) => s.addGear);
  const toggleGearAcquired = useCrewStore((s) => s.toggleGearAcquired);
  const removeGear = useCrewStore((s) => s.removeGear);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<GearCategory>("Tech");
  const [cost, setCost] = useState("");

  const totalCost = gear.reduce((sum, g) => sum + g.cost, 0);
  const acquiredCost = gear.filter((g) => g.acquired).reduce((sum, g) => sum + g.cost, 0);

  const submit = () => {
    if (!name.trim()) return;
    addGear({ name: name.trim(), category, cost: Number(cost) || 0, acquired: false });
    setName("");
    setCost("");
    setShowForm(false);
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-lg tracking-[0.08em] text-paper">Loadout</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-[11px] uppercase tracking-[0.15em] text-blue-soft hover:text-blue-print"
        >
          {showForm ? "Cancel" : "+ Item"}
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between border border-ink-600 bg-ink-800/40 px-2.5 py-1.5">
        <span className="text-[11px] uppercase tracking-[0.15em] text-paper-dim">Budget</span>
        <span className="font-mono text-xs text-gold-bright">
          ${acquiredCost.toLocaleString()} <span className="text-paper-dim">/ ${totalCost.toLocaleString()}</span>
        </span>
      </div>

      {showForm && (
        <div className="mb-3 space-y-2 border border-ink-600 bg-ink-800/60 p-2.5 animate-riseIn">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            className="w-full border border-ink-600 bg-ink-900/70 p-1.5 text-sm text-paper outline-none placeholder:text-paper-dim/60 focus:border-blue-dim"
          />
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GearCategory)}
              className="flex-1 border border-ink-600 bg-ink-900/70 p-1.5 text-sm text-paper outline-none focus:border-blue-dim"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              value={cost}
              onChange={(e) => setCost(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Cost"
              className="w-24 border border-ink-600 bg-ink-900/70 p-1.5 text-sm text-paper outline-none placeholder:text-paper-dim/60 focus:border-blue-dim"
            />
          </div>
          <button
            onClick={submit}
            className="w-full border border-gold-dim bg-gold-dim/30 py-1.5 text-[11px] uppercase tracking-[0.15em] text-gold-bright hover:bg-gold-dim/50"
          >
            Add to manifest
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        {gear.map((item) => (
          <GearTag key={item.id} item={item} onToggle={toggleGearAcquired} onRemove={removeGear} />
        ))}
        {gear.length === 0 && (
          <p className="border border-dashed border-ink-600 p-3 text-center text-[11px] text-paper-dim">
            Manifest is empty.
          </p>
        )}
      </div>
    </section>
  );
}
