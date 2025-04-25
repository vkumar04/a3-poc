"use client";

import { useState, useCallback } from "react";
import { DndContext, closestCenter, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import RenderSortableTree from "./RenderSortableTree";
import { findPathToNode, removeNodeById, insertNodeAtPath, findIndexAtPath, findNodeLabel, initialTree } from "./treeUtils";

export default function DndTreeAccordion() {
  const [tree, setTree] = useState(initialTree);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    if (over.id.toString().endsWith("-dropzone")) {
      const parentId = over.id.toString().replace(/-dropzone$/, "");
      const parentPath = findPathToNode(tree, parentId) || [];
      const {node: draggedNode, newTree: treeWithoutNode} = removeNodeById(tree, String(active.id));
      if (!draggedNode) return;
      const newTree = insertNodeAtPath(treeWithoutNode, [...parentPath, parentId], 0, draggedNode);
      setTree(newTree);
      return;
    }

    const activePath = findPathToNode(tree, String(active.id)) || [];
    const overPath = findPathToNode(tree, String(over.id)) || [];
    if (activePath.length !== overPath.length) return;
    const activeIndex = findIndexAtPath(tree, activePath, String(active.id));
    const overIndex = findIndexAtPath(tree, overPath, String(over.id));
    const {node: draggedNode, newTree: treeWithoutNode} = removeNodeById(tree, String(active.id));
    if (!draggedNode) return;
    const newTree = insertNodeAtPath(treeWithoutNode, overPath, overIndex, draggedNode);
    setTree(newTree);
  }

  const renderChildren = useCallback(
    (children: any[], parentPath: string[]) => (
      <RenderSortableTree
        nodes={children}
        level={parentPath.length + 1}
        parentPath={parentPath}
        onRenderChildren={renderChildren}
      />
    ),
    []
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={event => setActiveId(event.active.id as string)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <RenderSortableTree nodes={tree} onRenderChildren={renderChildren} />
      <DragOverlay>
        {activeId ? (
          <div className="bg-muted rounded px-2 py-1 flex items-center gap-2 shadow">
            <GripVertical size={16} />
            <span>
              {findNodeLabel(tree, activeId)}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}