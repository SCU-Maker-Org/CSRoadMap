import type { NodeStatus, Roadmap } from "../types/roadmap";

interface ProgressSummaryProps {
  roadmap: Roadmap;
  getStatus: (nodeId: string) => NodeStatus;
  onResetProgress: () => void;
}

export function ProgressSummary({
  roadmap,
  getStatus,
  onResetProgress,
}: ProgressSummaryProps) {
  const totalCount = roadmap.nodes.length;
  const completedCount = roadmap.nodes.filter(
    (node) => getStatus(node.id) === "completed",
  ).length;
  const learningCount = roadmap.nodes.filter(
    (node) => getStatus(node.id) === "learning",
  ).length;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">当前路线</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">
            {roadmap.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onResetProgress}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
        >
          重置进度
        </button>
      </div>

      <div className="mt-4 grid border-t border-slate-200 pt-4 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
        <div className="py-2 sm:pr-4">
          <p className="text-xs text-slate-500">已掌握</p>
          <p className="mt-1 text-xl font-semibold text-green-700">
            {completedCount} / {totalCount}
          </p>
        </div>
        <div className="py-2 sm:px-4">
          <p className="text-xs text-slate-500">学习中</p>
          <p className="mt-1 text-xl font-semibold text-blue-700">
            {learningCount}
          </p>
        </div>
        <div className="py-2 sm:pl-4">
          <p className="text-xs text-slate-500">完成度</p>
          <p className="mt-1 text-xl font-semibold text-slate-950">
            {percent}%
          </p>
        </div>
      </div>
    </section>
  );
}
