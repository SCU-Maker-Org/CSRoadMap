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
import { type NodeStatus, type Roadmap } from "../types/roadmap";

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
  icon: string;
}

const statusBadgeClass: Record<NodeStatus, string> = {
  not_started: "quest-hex-badge-not_started",
  learning: "quest-hex-badge-learning",
  completed: "quest-hex-badge-completed",
};

const statusBadgeSymbol: Record<NodeStatus, string> = {
  not_started: "?",
  learning: "✦",
  completed: "✓",
};

const edgeColors: Record<NodeStatus, string> = {
  not_started: "#3a3a3a",
  learning: "#c8a84e",
  completed: "#4a8c3f",
};

function pickIcon(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("python")) return "🐍";
  if (t.includes("c++") || t.includes("cpp")) return "⚙️";
  if (t.includes("java")) return "☕";
  if (t.includes("linux")) return "🐧";
  if (t.includes("git") || t.includes("github")) return "🔀";
  if (t.includes("html") || t.includes("css")) return "🎨";
  if (t.includes("javascript") || t.includes("js")) return "📜";
  if (t.includes("typescript") || t.includes("ts")) return "📘";
  if (t.includes("react") || t.includes("vue")) return "⚛️";
  if (t.includes("api") || t.includes("http")) return "🔗";
  if (t.includes("数据库") || t.includes("database") || t.includes("sql")) return "🗄️";
  if (t.includes("docker")) return "🐳";
  if (t.includes("网络") || t.includes("network")) return "🌐";
  if (t.includes("安全") || t.includes("security") || t.includes("ctf")) return "🛡️";
  if (t.includes("算法") || t.includes("algo") || t.includes("竞赛")) return "🏆";
  if (t.includes("数据结构") || t.includes("ds")) return "🔢";
  if (t.includes("搜索") || t.includes("search")) return "🔍";
  if (t.includes("动态规划") || t.includes("dp")) return "🧩";
  if (t.includes("图论") || t.includes("graph")) return "🕸️";
  if (t.includes("数学") || t.includes("math")) return "📐";
  if (t.includes("机器学习") || t.includes("ml")) return "🤖";
  if (t.includes("深度学习") || t.includes("dl") || t.includes("pytorch")) return "🧠";
  if (t.includes("numpy") || t.includes("pandas")) return "📊";
  if (t.includes("部署") || t.includes("deploy")) return "🚀";
  if (t.includes("命令行") || t.includes("cli") || t.includes("terminal")) return "💻";
  if (t.includes("markdown")) return "📝";
  if (t.includes("vscode") || t.includes("编辑器")) return "🖊️";
  if (t.includes("身份认证") || t.includes("auth")) return "🔐";
  if (t.includes("框架") || t.includes("framework") || t.includes("spring")) return "🏗️";
  if (t.includes("stl")) return "📦";
  if (t.includes("渗透") || t.includes("pentest")) return "🎯";
  if (t.includes("cv") || t.includes("nlp") || t.includes("大模型")) return "👁️";
  if (t.includes("web")) return "🕸️";
  if (t.includes("训练") || t.includes("training")) return "⚡";
  if (t.includes("专业认知") || t.includes("intro")) return "🎓";
  if (t.includes("编程语言")) return "⌨️";
  return "📋";
}

function SkillMapNode({ data }: NodeProps<Node<SkillNodeData>>) {
  const hexClass = `quest-hex quest-hex-${data.status}${data.selected ? " quest-hex-selected" : ""}`;

  return (
    <div className="flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <div className={hexClass}>
        <div className="quest-hex-inner">
          <span className="quest-hex-icon">{data.icon}</span>
          <span className="quest-hex-label text-[#c8c8c8]">{data.title}</span>
        </div>
        <div className={`quest-hex-badge ${statusBadgeClass[data.status]}`}>
          {statusBadgeSymbol[data.status]}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
    </div>
  );
}

const nodeTypes = { skillMapNode: SkillMapNode };

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
        const col = index % 3;
        const row = Math.floor(index / 3);

        return {
          id: node.id,
          type: "skillMapNode",
          position: {
            x: col * 200 + (row % 2 === 0 ? 0 : 100),
            y: row * 180,
          },
          data: {
            title: node.title,
            stage: node.stage,
            status,
            selected: selectedNodeId === node.id,
            icon: node.icon ?? pickIcon(node.title),
          },
          draggable: false,
        };
      }),
    [getStatus, roadmap.nodes, selectedNodeId],
  );

  const mainEdges = useMemo<Edge[]>(
    () =>
      roadmap.edges.map((edge) => {
        const targetStatus = getStatus(edge.target);
        return {
          id: `${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          type: "smoothstep",
          zIndex: 5,
          animated: targetStatus === "learning",
          style: {
            stroke: edgeColors[targetStatus],
            strokeWidth: 3,
            strokeLinecap: "round",
          },
        };
      }),
    [roadmap.edges, getStatus],
  );

  return (
    <section className="flex-1 flex flex-col min-h-0 mc-panel overflow-hidden">
      <div className="px-4 py-3 border-b-2 border-[#0a0a0a] bg-[#151515] flex items-center gap-3">
        <span className="text-lg">{roadmap.icon ?? "📋"}</span>
        <div>
          <h2 className="text-sm font-bold text-[#c8c8c8]">{roadmap.title}</h2>
          <p className="text-[11px] text-[#666]">{roadmap.description}</p>
        </div>
      </div>
      <div className="quest-canvas flex-1">
        <ReactFlow
          key={roadmap.id}
          nodes={skillNodes}
          edges={mainEdges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => {
            if (roadmap.nodes.some((n) => n.id === node.id)) {
              onSelectNode(node.id);
            }
          }}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.4}
          maxZoom={1.6}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background gap={48} color="rgba(255,255,255,0.03)" />
          <Controls position="bottom-right" />
        </ReactFlow>
      </div>
    </section>
  );
}
