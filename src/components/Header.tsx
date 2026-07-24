"use client";

import { useEffect, useState } from "react";
import { useCrewStore } from "@/store/useCrewStore";

export default function Header() {
  const resetBoard = useCrewStore((s) => s.resetBoard);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-600 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="crosshair-corners flex h-9 w-9 items-center justify-center border border-blue-dim bg-ink-800">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulseDot" />
          </div>
          <div className="leading-none">
            <h1 className="font-display text-2xl tracking-[0.08em] text-paper">
              BLACK<span className="text-blue-print">PRINT</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
              Heist Crew Organizer
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-paper-dim">Local Time</p>
            <p className="font-mono text-sm text-blue-soft">{time || "--:--:--"}</p>
          </div>
          <div className="h-8 w-px bg-ink-600" />
          <p className="max-w-[280px] font-stamp text-xs leading-tight text-gold-bright/80">
            &ldquo;A good plan today beats a perfect plan tomorrow.&rdquo;
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm("Wipe the board and reload the original case file?")) resetBoard();
          }}
          className="border border-ink-600 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-paper-dim transition hover:border-redact/60 hover:text-redact"
        >
          Reset Case
        </button>
      </div>
    </header>
  );
}
