'use client'

import { useSortable } from "@dnd-kit/sortable";
import { levelColors } from "../../utils/treeUtils";

export default function DropZone({ id, style, level }: { id: string; style?: React.CSSProperties; level: number }) {
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