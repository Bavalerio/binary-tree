import { BinaryTree } from '../types';

export function buildBinaryTree(node: any[]): BinaryTree {
  const isArray = Array.isArray(node);

  if (!isArray) {
    if (!node) return node;
    return {
      id: node,
    };
  }

  if (node.length === 1) {
    return {
      id: node[0],
    };
  }

  if (node.length === 2) {
    return {
      id: node[0],
      left: buildBinaryTree(node[1]),
    };
  }
  return {
    id: node[0],
    left: buildBinaryTree(node[1]),
    right: buildBinaryTree(node[2]),
  };
}
