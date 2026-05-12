import type { Roadmap } from "../types/roadmap";

interface RoadmapSelectorProps {
  roadmaps: Roadmap[];
  selectedRoadmapId: string;
  onSelect: (id: string) => void;
}

export function RoadmapSelector({
  roadmaps,
  selectedRoadmapId,
  onSelect,
}: RoadmapSelectorProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-950">路线选择</h2>
      <div className="mt-4 grid gap-2">
        {roadmaps.map((roadmap) => {
          const isSelected = roadmap.id === selectedRoadmapId;

          return (
            <button
              type="button"
              key={roadmap.id}
              onClick={() => onSelect(roadmap.id)}
              className={`rounded-md border px-3 py-3 text-left transition ${
                isSelected
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="block text-sm font-semibold">
                {roadmap.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {roadmap.description}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
