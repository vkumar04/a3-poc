'use client'

import { ReactNode } from "react";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { GripVertical } from "lucide-react";
import DropZone from "./DropZone";
import { levelColors } from "../../utils/treeUtils";
import { TreeNode } from "@/types/tree";

export default function SortableAccordionTreeNode({
  node,
  level = 1,
  parentPath = [],
  onRenderChildren,
}: {
  node: TreeNode;
  level?: number;
  parentPath?: string[];
  onRenderChildren: (children: TreeNode[], parentPath: string[]) => ReactNode;
  colorClass?: string;
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
                ? node.children.map((c: TreeNode) => c.id)
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