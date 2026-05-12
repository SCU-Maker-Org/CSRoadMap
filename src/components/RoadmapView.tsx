import { useMemo } from "react";
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import type { CSSProperties } from "react";
import { statusText, type NodeStatus, type Roadmap } from "../types/roadmap";

interface RoadmapViewProps {
  roadmap: Roadmap;
  getStatus: (nodeId: string) => NodeStatus;
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

function getNodeStyle(status: NodeStatus, selected: boolean): CSSProperties {
  const base: CSSProperties = {
    width: 180,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 14,
    fontWeight: 600,
    padding: "12px 14px",
    boxShadow: selected
      ? "0 0 0 4px rgba(59, 130, 246, 0.18), 0 12px 24px rgba(15, 23, 42, 0.12)"
      : "0 8px 20px rgba(15, 23, 42, 0.08)",
  };

  if (status === "completed") {
    return {
      ...base,
      border: "2px solid #22c55e",
      background: "#dcfce7",
      color: "#166534",
    };
  }

  if (status === "learning") {
    return {
      ...base,
      border: "2px solid #3b82f6",
      background: "#dbeafe",
      color: "#1e40af",
    };
  }

  return {
    ...base,
    border: "2px solid #d1d5db",
    background: "#f9fafb",
    color: "#374151",
  };
}

export function RoadmapView({
  roadmap,
  getStatus,
  onSelectNode,
  selectedNodeId,
}: RoadmapViewProps) {
  const flowNodes = useMemo<Node[]>(
    () =>
      roadmap.nodes.map((node) => {
        const status = getStatus(node.id);

        return {
          id: node.id,
          position: {
            x: node.x,
            y: node.y,
          },
          data: {
            label: `${node.title}\n${node.stage ?? ""}\n${statusText[status]}`,
          },
          style: getNodeStyle(status, selectedNodeId === node.id),
        };
      }),
    [getStatus, roadmap.nodes, selectedNodeId],
  );

  const flowEdges = useMemo<Edge[]>(
    () =>
      roadmap.edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#64748b",
        },
        style: {
          stroke: "#64748b",
          strokeWidth: 2,
        },
      })),
    [roadmap.edges],
  );

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">Roadmap 图谱</h2>
        <p className="mt-1 text-xs text-slate-500">{roadmap.description}</p>
      </div>
      <div className="h-[520px] w-full bg-slate-50 sm:h-[560px]">
        <ReactFlow
          key={roadmap.id}
          nodes={flowNodes}
          edges={flowEdges}
          onNodeClick={(_, node) => onSelectNode(node.id)}
          fitView
          fitViewOptions={{ padding: 0.16 }}
          minZoom={0.25}
          maxZoom={1.6}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background gap={24} color="#cbd5e1" />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </section>
  );
}
