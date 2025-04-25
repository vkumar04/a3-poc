export const initialTree = [
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

export const colorPalette = [
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

export const levelColors = [
  "border-l-blue-500",
  "border-l-red-500",
  "border-l-orange-500",
  "border-l-yellow-400"
];

export function removeNodeById(tree: any[], id: string): {node: any, newTree: any[]} {
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

export function insertNodeAtPath(tree: any[], path: string[], index: number, node: any): any[] {
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

export function findPathToNode(tree: any[], id: string, path: string[] = []): string[] | null {
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

export function findIndexAtPath(tree: any[], path: string[], id: string): number {
  if (path.length === 0) {
    return tree.findIndex(n => n.id === id);
  }
  const [head, ...rest] = path;
  const next = tree.find(n => n.id === head);
  if (!next) return -1;
  return findIndexAtPath(next.children || [], rest, id);
}

export function findNodeLabel(nodes: any[], id: string): string | null {
  for (const node of nodes) {
    if (node.id === id) return node.title;
    if (node.children) {
      const found = findNodeLabel(node.children, id);
      if (found) return found;
    }
  }
  return null;
}