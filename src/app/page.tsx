import Header from "@/components/Header";
import CrewRoster from "@/components/CrewRoster";
import LoadoutPanel from "@/components/LoadoutPanel";
import PhaseTicker from "@/components/PhaseTicker";
import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-[1600px] gap-6 px-5 py-6">
        <aside className="sticky top-[76px] hidden h-[calc(100vh-96px)] w-[280px] shrink-0 space-y-6 overflow-y-auto pr-1 lg:block">
          <CrewRoster />
          <LoadoutPanel />
        </aside>

        <section className="min-w-0 flex-1">
          <PhaseTicker />
          <Board />

          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-ink-600 pt-6 sm:grid-cols-2 lg:hidden">
            <CrewRoster />
            <LoadoutPanel />
          </div>
        </section>
      </div>
    </main>
  );
}
