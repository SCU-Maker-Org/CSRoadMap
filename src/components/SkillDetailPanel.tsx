import {
  statusOptions,
  statusText,
  type NodeStatus,
  type RoadmapNode,
} from "../types/roadmap";

interface SkillDetailPanelProps {
  node: RoadmapNode | null;
  status: NodeStatus;
  onStatusChange: (status: NodeStatus) => void;
}

const statusButtonClasses: Record<NodeStatus, string> = {
  not_started: "border-stone-300 bg-[#fbf4df] text-stone-700",
  learning: "border-blue-500 bg-blue-50 text-blue-700",
  completed: "border-green-500 bg-green-50 text-green-700",
};

const activeRingClasses: Record<NodeStatus, string> = {
  not_started: "ring-slate-300",
  learning: "ring-blue-300",
  completed: "ring-green-300",
};

export function SkillDetailPanel({
  node,
  status,
  onStatusChange,
}: SkillDetailPanelProps) {
  if (!node) {
    return (
      <aside className="rounded-lg border border-stone-300 bg-[#fffaf0] p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-stone-950">节点详情</h2>
        <div className="mt-6 rounded-md border border-dashed border-stone-300 bg-[#fbf4df] px-4 py-8 text-center text-sm text-stone-600">
          点击一个节点查看详情
        </div>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-stone-300 bg-[#fffaf0] p-5 shadow-sm">
      <p className="text-sm font-semibold text-stone-950">节点详情</p>
      <h2 className="mt-4 text-xl font-semibold leading-7 text-stone-950">
        {node.title}
      </h2>

      <dl className="mt-4 grid gap-3 text-sm">
        <div>
          <dt className="text-stone-600">建议阶段</dt>
          <dd className="mt-1 font-medium text-stone-800">
            {node.stage ?? "未指定"}
          </dd>
        </div>
        <div>
          <dt className="text-stone-600">当前状态</dt>
          <dd className="mt-1 font-medium text-stone-800">
            {statusText[status]}
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-6 text-stone-700">
        {node.description}
      </p>

      <div className="mt-6">
        <p className="text-sm font-medium text-stone-950">标记状态</p>
        <div className="mt-3 grid gap-2">
          {statusOptions.map((option) => {
            const isSelected = option === status;

            return (
              <button
                type="button"
                key={option}
                onClick={() => onStatusChange(option)}
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-[#f6efd9] ${
                  statusButtonClasses[option]
                } ${isSelected ? `ring-2 ${activeRingClasses[option]}` : ""}`}
              >
                <span>{statusText[option]}</span>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    option === "completed"
                      ? "bg-green-500"
                      : option === "learning"
                        ? "bg-blue-500"
                        : "bg-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
