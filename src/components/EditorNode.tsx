import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

export interface EditorNodeData extends Record<string, unknown> {
  id: string;
  title: string;
  description?: string;
  stage?: string;
  icon?: string;
}

export function EditorNode({ data, selected }: NodeProps<Node<EditorNodeData>>) {
  return (
    <div className={`editor-node${selected ? " selected" : ""}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="editor-node-handle"
      />
      <div className="flex items-center gap-2">
        <span className="text-base">{data.icon ?? "📋"}</span>
        <div className="min-w-0">
          <span className="block text-[12px] font-bold text-[#c8c8c8] truncate">
            {data.title}
          </span>
          <span className="block text-[10px] text-[#555] font-mono">
            #{data.id}
          </span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="editor-node-handle"
      />
    </div>
  );
}
