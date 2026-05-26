import { useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { EditorNode, type EditorNodeData } from "./EditorNode";

const nodeTypes = { editorNode: EditorNode };

interface EditorCanvasProps {
  nodes: Node<EditorNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node<EditorNodeData>>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
}

export function EditorCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onSelectNode,
  onSelectEdge,
}: EditorCanvasProps) {
  const handleSelectionChange = useCallback(
    ({ nodes: selNodes, edges: selEdges }: { nodes: Node[]; edges: Edge[] }) => {
      if (selNodes.length === 1) {
        onSelectNode(selNodes[0].id);
        onSelectEdge(null);
      } else if (selEdges.length === 1) {
        onSelectEdge(selEdges[0].id);
        onSelectNode(null);
      } else {
        onSelectNode(null);
        onSelectEdge(null);
      }
    },
    [onSelectNode, onSelectEdge],
  );

  return (
    <div className="editor-canvas flex-1">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={handleSelectionChange}
        nodeTypes={nodeTypes}
        nodesDraggable
        nodesConnectable
        deleteKeyCode="Delete"
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#5a5a5a", strokeWidth: 2 },
        }}
      >
        <Background gap={48} color="rgba(255,255,255,0.03)" />
        <Controls position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
