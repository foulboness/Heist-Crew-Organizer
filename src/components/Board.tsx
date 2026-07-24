"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useCrewStore } from "@/store/useCrewStore";
import Column from "./Column";
import { CrewAvatar } from "./CrewChip";
import GearTag from "./GearTag";
import JobCard from "./JobCard";

export default function Board() {
  const columns = useCrewStore((s) => s.columns);
  const jobs = useCrewStore((s) => s.jobs);
  const crew = useCrewStore((s) => s.crew);
  const gear = useCrewStore((s) => s.gear);
  const moveJob = useCrewStore((s) => s.moveJob);
  const reorderWithinColumn = useCrewStore((s) => s.reorderWithinColumn);
  const assignCrewToJob = useCrewStore((s) => s.assignCrewToJob);
  const attachGearToJob = useCrewStore((s) => s.attachGearToJob);

  const [activeDrag, setActiveDrag] = useState<{
    type: "job" | "crew" | "gear";
    id: string;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const sortedColumns = useMemo(() => [...columns].sort((a, b) => a.order - b.order), [columns]);

  function onDragStart(event: DragStartEvent) {
    const data = event.active.data.current as any;
    if (!data) return;
    if (data.type === "job") setActiveDrag({ type: "job", id: event.active.id as string });
    if (data.type === "crew") setActiveDrag({ type: "crew", id: data.crewId });
    if (data.type === "gear") setActiveDrag({ type: "gear", id: data.gearId });
  }

  function findJobColumn(jobId: string) {
    return jobs.find((j) => j.id === jobId)?.columnId;
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDrag(null);
    if (!over) return;

    const activeData = active.data.current as any;
    const overData = over.data.current as any;

    // Crew chip dropped onto a job card
    if (activeData?.type === "crew") {
      const targetJobId = overData?.type === "job" ? (over.id as string) : null;
      if (targetJobId) assignCrewToJob(targetJobId, activeData.crewId);
      return;
    }

    // Gear tag dropped onto a job card
    if (activeData?.type === "gear") {
      const targetJobId = overData?.type === "job" ? (over.id as string) : null;
      if (targetJobId) attachGearToJob(targetJobId, activeData.gearId);
      return;
    }

    // Job card dragged within/between columns
    if (activeData?.type === "job") {
      const activeId = active.id as string;
      const overId = over.id as string;
      if (activeId === overId) return;

      const activeColumnId = findJobColumn(activeId);
      const isOverColumn = overData?.type === "column";
      const overColumnId = isOverColumn ? overId : findJobColumn(overId);

      if (!activeColumnId || !overColumnId) return;

      if (activeColumnId === overColumnId) {
        if (!isOverColumn) reorderWithinColumn(activeColumnId, activeId, overId);
        return;
      }

      // Moving to a different column
      const destJobs = jobs.filter((j) => j.columnId === overColumnId).sort((a, b) => a.order - b.order);
      const overIndex = isOverColumn ? destJobs.length : destJobs.findIndex((j) => j.id === overId);
      moveJob(activeId, overColumnId, overIndex === -1 ? destJobs.length : overIndex);
    }
  }

  const activeJob = activeDrag?.type === "job" ? jobs.find((j) => j.id === activeDrag.id) : null;
  const activeCrew = activeDrag?.type === "crew" ? crew.find((c) => c.id === activeDrag.id) : null;
  const activeGear = activeDrag?.type === "gear" ? gear.find((g) => g.id === activeDrag.id) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveDrag(null)}
    >
      <div className="flex gap-5 overflow-x-auto pb-4">
        {sortedColumns.map((col) => (
          <Column key={col.id} column={col} jobs={jobs.filter((j) => j.columnId === col.id)} />
        ))}
      </div>

      <DragOverlay>
        {activeJob && (
          <div className="w-[284px] rotate-1 opacity-95">
            <JobCard job={activeJob} />
          </div>
        )}
        {activeCrew && (
          <div className="flex items-center gap-2 border border-blue-dim bg-ink-800 px-2.5 py-2 shadow-card-hover">
            <CrewAvatar member={activeCrew} />
            <span className="font-display text-sm text-paper">{activeCrew.codename}</span>
          </div>
        )}
        {activeGear && (
          <div className="w-[220px]">
            <GearTag item={activeGear} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
