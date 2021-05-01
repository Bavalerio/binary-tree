import { BinaryTree } from '../../types';
import Tree from 'react-tree-graph';

interface TreeGraphProps {
  deepestTree?: BinaryTree;
  node?: BinaryTree;
  showVertical: boolean;
}

interface GraphNode {
  name: string;
  color: string;
  pathProps: any;
  children: GraphNode[];
}

export const TreeGraph: React.FC<TreeGraphProps> = ({
  deepestTree,
  node,
  showVertical = true,
}) => {
  const transformToGraph = (n?: BinaryTree): GraphNode | undefined => {
    if (!n) return undefined;

    const isTheDeepestTree = n == deepestTree;
    const color = isTheDeepestTree ? 'green' : 'purple';
    const children: GraphNode[] = [];
    const left = transformToGraph(n.left);
    const right = transformToGraph(n.right);
    if (left) {
      children.push(left);
    }
    if (right) {
      children.push(right);
    }

    return { name: n.id, color, pathProps: { className: color }, children };
  };

  const data = transformToGraph(node);
  const svgProps = showVertical
    ? {
        transform: 'rotate(90)',
      }
    : {};

  return (
    <Tree
      animated={true}
      nodeRadius={15}
      margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
      gProps={{
        className: 'node',
      }}
      data={data}
      height={400}
      width={400}
      svgProps={svgProps}
    />
  );
};
