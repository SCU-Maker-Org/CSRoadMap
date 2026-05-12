import { useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { statusText, type NodeStatus, type Roadmap } from "../types/roadmap";

interface RoadmapViewProps {
  roadmap: Roadmap;
  getStatus: (nodeId: string) => NodeStatus;
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

interface SkillNodeData extends Record<string, unknown> {
  title: string;
  stage?: string;
  status: NodeStatus;
  selected: boolean;
}

interface BranchNodeData extends Record<string, unknown> {
  label: string;
}

const statusCircleClasses: Record<NodeStatus, string> = {
  not_started: "border-stone-400 bg-stone-100 text-stone-700",
  learning: "border-blue-500 bg-blue-100 text-blue-800",
  completed: "border-green-600 bg-green-100 text-green-800",
};

const statusDotClasses: Record<NodeStatus, string> = {
  not_started: "bg-stone-400",
  learning: "bg-blue-500",
  completed: "bg-green-600",
};

const statusSymbols: Record<NodeStatus, string> = {
  not_started: "?",
  learning: "学",
  completed: "✓",
};

const mainPathX = [370, 480, 420, 535, 390, 310, 455, 530, 445, 345];
const verticalGap = 170;

function invisibleHandleClasses() {
  return "!h-2 !w-2 !border-none !bg-transparent";
}

function SkillMapNode({ data }: NodeProps<Node<SkillNodeData>>) {
  return (
    <div className="flex w-36 flex-col items-center text-center">
      <Handle
        type="target"
        position={Position.Top}
        className={invisibleHandleClasses()}
      />
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-semibold shadow-sm ${
          statusCircleClasses[data.status]
        } ${data.selected ? "ring-4 ring-red-300" : ""}`}
      >
        {statusSymbols[data.status]}
      </div>
      <div className="mt-2 max-w-36 rounded-md border border-stone-300 bg-[#fffaf0]/95 px-2 py-1 shadow-sm">
        <p className="truncate text-xs font-semibold text-stone-900">
          {data.title}
        </p>
        <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] leading-4 text-stone-600">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDotClasses[data.status]}`} />
          <span>{data.stage ?? "未指定"}</span>
          <span>{statusText[data.status]}</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className={invisibleHandleClasses()}
      />
    </div>
  );
}

function BranchMapNode({ data }: NodeProps<Node<BranchNodeData>>) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-400 bg-[#ede4ce] text-[11px] font-semibold text-stone-600 shadow-sm">
      <Handle
        type="target"
        position={Position.Top}
        className={invisibleHandleClasses()}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className={invisibleHandleClasses()}
      />
    </div>
  );
}

const nodeTypes = {
  skillMapNode: SkillMapNode,
  branchMapNode: BranchMapNode,
};

function buildBranchNodes(roadmap: Roadmap): Node<BranchNodeData>[] {
  return roadmap.nodes.flatMap((_, index) => {
    const y = index * verticalGap + 70;
    const leftX = 145 + (index % 3) * 46;
    const rightX = 705 - (index % 3) * 52;

    return [
      {
        id: `${roadmap.id}-left-${index}`,
        type: "branchMapNode",
        position: { x: leftX, y },
        data: { label: index % 2 === 0 ? "?" : "□" },
        selectable: false,
        draggable: false,
      },
      {
        id: `${roadmap.id}-right-${index}`,
        type: "branchMapNode",
        position: { x: rightX, y: y + 24 },
        data: { label: index % 2 === 0 ? "○" : "?" },
        selectable: false,
        draggable: false,
      },
    ];
  });
}

function buildBranchEdges(roadmap: Roadmap): Edge[] {
  const edges: Edge[] = [];

  roadmap.nodes.forEach((node, index) => {
    if (index > 0) {
      edges.push({
        id: `${roadmap.id}-left-${index - 1}-${index}`,
        source: `${roadmap.id}-left-${index - 1}`,
        target: `${roadmap.id}-left-${index}`,
        type: "straight",
        style: {
          stroke: "#8d8674",
          strokeWidth: 2,
          strokeDasharray: "5 8",
        },
      });
      edges.push({
        id: `${roadmap.id}-right-${index - 1}-${index}`,
        source: `${roadmap.id}-right-${index - 1}`,
        target: `${roadmap.id}-right-${index}`,
        type: "straight",
        style: {
          stroke: "#8d8674",
          strokeWidth: 2,
          strokeDasharray: "5 8",
        },
      });
    }

    if (index % 2 === 0) {
      edges.push({
        id: `${node.id}-left-branch`,
        source: node.id,
        target: `${roadmap.id}-left-${index}`,
        type: "straight",
        style: {
          stroke: "#8d8674",
          strokeWidth: 1.8,
          strokeDasharray: "4 7",
        },
      });
    } else {
      edges.push({
        id: `${node.id}-right-branch`,
        source: node.id,
        target: `${roadmap.id}-right-${index}`,
        type: "straight",
        style: {
          stroke: "#8d8674",
          strokeWidth: 1.8,
          strokeDasharray: "4 7",
        },
      });
    }
  });

  return edges;
}

export function RoadmapView({
  roadmap,
  getStatus,
  onSelectNode,
  selectedNodeId,
}: RoadmapViewProps) {
  const skillNodes = useMemo<Node<SkillNodeData>[]>(
    () =>
      roadmap.nodes.map((node, index) => {
        const status = getStatus(node.id);

        return {
          id: node.id,
          type: "skillMapNode",
          position: {
            x: mainPathX[index % mainPathX.length],
            y: index * verticalGap,
          },
          data: {
            title: node.title,
            stage: node.stage,
            status,
            selected: selectedNodeId === node.id,
          },
          draggable: false,
        };
      }),
    [getStatus, roadmap.nodes, selectedNodeId],
  );

  const branchNodes = useMemo(() => buildBranchNodes(roadmap), [roadmap]);

  const flowNodes = useMemo<Node[]>(
    () => [...branchNodes, ...skillNodes],
    [branchNodes, skillNodes],
  );

  const mainEdges = useMemo<Edge[]>(
    () =>
      roadmap.edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "straight",
        zIndex: 10,
        style: {
          stroke: "#d43131",
          strokeWidth: 4,
          strokeLinecap: "round",
        },
      })),
    [roadmap.edges],
  );

  const branchEdges = useMemo(() => buildBranchEdges(roadmap), [roadmap]);
  const flowEdges = useMemo<Edge[]>(
    () => [...branchEdges, ...mainEdges],
    [branchEdges, mainEdges],
  );

  return (
    <section className="overflow-hidden rounded-lg border border-stone-300 bg-[#f6efd9] shadow-sm">
      <div className="border-b border-stone-300 bg-[#fffaf0] px-4 py-3">
        <h2 className="text-sm font-semibold text-stone-950">Roadmap 图谱</h2>
        <p className="mt-1 text-xs text-stone-600">{roadmap.description}</p>
      </div>
      <div className="roadmap-map-surface h-[680px] w-full sm:h-[760px]">
        <ReactFlow
          key={roadmap.id}
          nodes={flowNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => {
            if (roadmap.nodes.some((item) => item.id === node.id)) {
              onSelectNode(node.id);
            }
          }}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.35}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={34} color="rgba(120, 113, 94, 0.22)" />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </section>
  );
}
