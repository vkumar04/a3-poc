'use client'

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Accordion } from "../ui/accordion";
import SortableAccordionTreeNode from "./SortableAccordionTreeNode";
import { colorPalette } from "./treeUtils";

export default function RenderSortableTree({
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