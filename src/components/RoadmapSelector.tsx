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
    <aside className="rounded-lg border border-stone-300 bg-[#fffaf0] p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-stone-950">路线选择</h2>
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
                  ? "border-red-500 bg-red-50 text-red-800"
                  : "border-stone-300 bg-[#fbf4df] text-stone-700 hover:border-stone-400 hover:bg-[#f6efd9]"
              }`}
            >
              <span className="block text-sm font-semibold">
                {roadmap.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-stone-600">
                {roadmap.description}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
