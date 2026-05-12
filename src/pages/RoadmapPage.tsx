import { useMemo, useState } from "react";
import { ProgressSummary } from "../components/ProgressSummary";
import { RoadmapSelector } from "../components/RoadmapSelector";
import { RoadmapView } from "../components/RoadmapView";
import { SkillDetailPanel } from "../components/SkillDetailPanel";
import { roadmaps } from "../data/roadmaps";
import { useProgress } from "../hooks/useProgress";
import type { Roadmap } from "../types/roadmap";

function getRoadmapById(id: string): Roadmap {
  return roadmaps.find((roadmap) => roadmap.id === id) ?? roadmaps[0];
}

export function RoadmapPage() {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(roadmaps[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { getStatus, setStatus, resetProgress } = useProgress();

  const selectedRoadmap = useMemo(
    () => getRoadmapById(selectedRoadmapId),
    [selectedRoadmapId],
  );

  const selectedNode = useMemo(
    () =>
      selectedNodeId
        ? selectedRoadmap.nodes.find((node) => node.id === selectedNodeId) ??
          null
        : null,
    [selectedNodeId, selectedRoadmap.nodes],
  );

  const selectedStatus = selectedNode
    ? getStatus(selectedNode.id)
    : "not_started";

  function handleSelectRoadmap(id: string) {
    setSelectedRoadmapId(id);
    setSelectedNodeId(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <RoadmapSelector
          roadmaps={roadmaps}
          selectedRoadmapId={selectedRoadmapId}
          onSelect={handleSelectRoadmap}
        />

        <div className="grid min-w-0 gap-5">
          <ProgressSummary
            roadmap={selectedRoadmap}
            getStatus={getStatus}
            onResetProgress={resetProgress}
          />
          <RoadmapView
            roadmap={selectedRoadmap}
            getStatus={getStatus}
            onSelectNode={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
        </div>

        <SkillDetailPanel
          node={selectedNode}
          status={selectedStatus}
          onStatusChange={(status) => {
            if (selectedNode) {
              setStatus(selectedNode.id, status);
            }
          }}
        />
      </div>
    </main>
  );
}
