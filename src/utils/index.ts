import { BinaryTree } from '../types';

export function buildBinaryTree(node: any[]): BinaryTree | undefined {
  const isArray = Array.isArray(node);

  if (!isArray) {
    if (!node) return undefined;
    if (typeof node === 'object') return undefined;

    return {
      id: node,
    };
  }
  if (node.length > 3) {
    throw new RangeError('The array must have a length between 1 and 3');
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

export function findDeepestTree(root: BinaryTree): BinaryTree {
  let maxDepth = -1;
  let result = root;

  const deepestNode = (node: BinaryTree | undefined, depth: number): number => {
    if (node == null) return depth;

    const leftDepth = deepestNode(node.left, depth + 1);

    const rightDepth = deepestNode(node.right, depth + 1);

    if (leftDepth == rightDepth) {
      maxDepth = Math.max(maxDepth, leftDepth);
      if (maxDepth == leftDepth) {
        result = node;
      }
    }

    return Math.max(leftDepth, rightDepth);
  };

  deepestNode(root, 0);
  return result;
}
