import { useMemo, useState } from "react";
import { ProgressSummary } from "../components/ProgressSummary";
import { RoadmapSelector } from "../components/RoadmapSelector";
import { RoadmapView } from "../components/RoadmapView";
import { SkillDetailPanel } from "../components/SkillDetailPanel";
import { roadmaps } from "../data/roadmaps";
import { useProgress } from "../hooks/useProgress";
import type { Roadmap } from "../types/roadmap";

function getRoadmapById(id: string): Roadmap {
  return roadmaps.find((r) => r.id === id) ?? roadmaps[0];
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
        ? selectedRoadmap.nodes.find((n) => n.id === selectedNodeId) ?? null
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
    <main className="flex-1 flex flex-col min-h-0">
      {/* Main content: Left chapter panel + Center canvas */}
      <div className="flex-1 flex min-h-0 p-3 gap-3">
        <div className="w-[220px] flex-shrink-0">
          <RoadmapSelector
            roadmaps={roadmaps}
            selectedRoadmapId={selectedRoadmapId}
            onSelect={handleSelectRoadmap}
          />
        </div>
        <RoadmapView
          roadmap={selectedRoadmap}
          getStatus={getStatus}
          onSelectNode={setSelectedNodeId}
          selectedNodeId={selectedNodeId}
        />
      </div>

      {/* Bottom status bar */}
      <ProgressSummary
        roadmap={selectedRoadmap}
        getStatus={getStatus}
        onResetProgress={resetProgress}
      />

      {/* Quest detail modal */}
      <SkillDetailPanel
        node={selectedNode}
        status={selectedStatus}
        onStatusChange={(status) => {
          if (selectedNode) {
            setStatus(selectedNode.id, status);
          }
        }}
        onClose={() => setSelectedNodeId(null)}
      />
    </main>
  );
}
