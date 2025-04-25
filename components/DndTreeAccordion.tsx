"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "./ui/accordion";
import {GripVertical} from "lucide-react";

const initialTree = [
  {
    id: "1",
    title: "Level 1 - A",
    children: [
      {
        id: "1-1",
        title: "Level 2 - A1",
        children: [
          {
            id: "1-1-1",
            title: "Level 3 - A1a",
            children: [
              {id: "1-1-1-1", title: "Level 4 - A1a-i", children: []},
              {id: "1-1-1-2", title: "Level 4 - A1a-ii", children: []},
            ],
          },
          {
            id: "1-1-2",
            title: "Level 3 - A1b",
            children: [],
          },
        ],
      },
      {
        id: "1-2",
        title: "Level 2 - A2",
        children: [],
      },
    ],
  },
  {
    id: "2",
    title: "Level 1 - B",
    children: [
      {
        id: "2-1",
        title: "Level 2 - B1",
        children: [],
      },
    ],
  },
];

function DropZone({ id, style, level }: { id: string; style?: React.CSSProperties; level: number }) {
  const { setNodeRef, isOver } = useSortable({ id });
  const bgColorClass = levelColors[(level - 1) % levelColors.length].replace('border-l-', 'bg-');

  return (
    <div
      ref={setNodeRef}
      className={`min-h-8 border border-dashed border-gray-300 my-2 rounded flex items-center justify-center text-xs transition-colors duration-150 ${isOver ? "bg-blue-100" : bgColorClass}`}
      style={style}
    >
    </div>
  );
}

const colorPalette = [
  "border-l-blue-500",
  "border-l-green-500",
  "border-l-red-500",
  "border-l-yellow-500",
  "border-l-purple-500",
  "border-l-pink-500",
  "border-l-teal-500",
  "border-l-orange-500",
  "border-l-cyan-500",
  "border-l-fuchsia-500"
];

const levelColors = [
  "border-l-blue-500",
  "border-l-red-500",
  "border-l-orange-500",
  "border-l-yellow-400"
];

function SortableAccordionTreeNode({
  node,
  level = 1,
  parentPath = [],
  onRenderChildren,
}: {
  node: any;
  level?: number;
  parentPath?: string[];
  onRenderChildren: (children: any[], parentPath: string[]) => React.ReactNode;
}) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: node.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dropZoneId = `${node.id}-dropzone`;
  const colorClass = levelColors[(level - 1) % levelColors.length];

  return (
    <AccordionItem
      ref={setNodeRef}
      value={node.id}
      style={style}
      className={`border-l-4 ${colorClass}`}
    >
      <div className={`flex items-center gap-2 ml-[${(level - 1) * 24}px] ${isDragging ? "opacity-50" : "opacity-100"}`}>
        <span
          {...listeners}
          {...attributes}
          className={`cursor-grab p-2 inline-flex items-center ${isDragging ? "opacity-50" : "opacity-100"} touch-none`}
          tabIndex={0}
          aria-label="Drag handle"
        >
          <GripVertical size={16} />
        </span>
        <AccordionTrigger>
          <span className="font-medium">{node.title}</span>
        </AccordionTrigger>
      </div>
      <AccordionContent>
        <div className="pl-2 text-sm text-muted-foreground"></div>
        {level < 4 && (
          <SortableContext
            items={
              node.children && node.children.length > 0
                ? node.children.map((c: any) => c.id)
                : [dropZoneId]
            }
            strategy={verticalListSortingStrategy}
          >
            {node.children && node.children.length > 0
              ? onRenderChildren(node.children, [...parentPath, node.id])
              : (
                <DropZone id={dropZoneId} level={level} />
              )
            }
          </SortableContext>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function RenderSortableTree({
  nodes,
  level = 1,
  parentPath = [],
  onRenderChildren,
}: {
  nodes: any[];
  level?: number;
  parentPath?: string[];
  onRenderChildren: (children: any[], parentPath: string[]) => React.ReactNode;
}) {
  return (
    <SortableContext items={nodes.map(n => n.id)} strategy={verticalListSortingStrategy}>
      <Accordion type="multiple">
        {nodes.map((node, idx) => (
          <SortableAccordionTreeNode
            key={node.id}
            node={node}
            level={level}
            parentPath={parentPath}
            onRenderChildren={onRenderChildren}
            colorClass={colorPalette[idx % colorPalette.length]}
          />
        ))}
      </Accordion>
    </SortableContext>
  );
}

function removeNodeById(tree: any[], id: string): {node: any, newTree: any[]} {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      const node = tree[i];
      const newTree = [...tree.slice(0, i), ...tree.slice(i + 1)];
      return {node, newTree};
    }
    if (tree[i].children) {
      const {node, newTree} = removeNodeById(tree[i].children, id);
      if (node) {
        tree[i].children = newTree;
        return {node, newTree: tree};
      }
    }
  }
  return {node: null, newTree: tree};
}

function insertNodeAtPath(tree: any[], path: string[], index: number, node: any): any[] {
  if (path.length === 0) {
    const newTree = [...tree];
    newTree.splice(index, 0, node);
    return newTree;
  }
  const [head, ...rest] = path;
  return tree.map(item => {
    if (item.id === head) {
      return {
        ...item,
        children: insertNodeAtPath(item.children || [], rest, index, node),
      };
    }
    return item;
  });
}

function findPathToNode(tree: any[], id: string, path: string[] = []): string[] | null {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      return path;
    }
    if (tree[i].children) {
      const childPath = findPathToNode(tree[i].children, id, [...path, tree[i].id]);
      if (childPath) return childPath;
    }
  }
  return null;
}

function findIndexAtPath(tree: any[], path: string[], id: string): number {
  if (path.length === 0) {
    return tree.findIndex(n => n.id === id);
  }
  const [head, ...rest] = path;
  const next = tree.find(n => n.id === head);
  if (!next) return -1;
  return findIndexAtPath(next.children || [], rest, id);
}

export default function DndTreeAccordion() {
  const [tree, setTree] = React.useState(initialTree);
  const [activeId, setActiveId] = React.useState<string | null>(null);

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

  const renderChildren = React.useCallback(
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

function findNodeLabel(nodes: any[], id: string): string | null {
  for (const node of nodes) {
    if (node.id === id) return node.title;
    if (node.children) {
      const found = findNodeLabel(node.children, id);
      if (found) return found;
    }
  }
  return null;
}