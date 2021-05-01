import { BinaryTree } from '../../types';
interface TreeNodeProps {
  deepestTree?: BinaryTree;
  node?: BinaryTree;
  isOddColor: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  deepestTree,
  node,
  isOddColor = true,
}) => {
  if (!node) {
    return <div className={'empty-box'}></div>;
  }

  const getClassName = () => {
    const isTheDeepestTree = node == deepestTree;
    if (isTheDeepestTree) return 'deepest-tree';
    return isOddColor ? 'oddNode' : 'evenNode';
  };

  const className = getClassName();
  const hasChildren = node.left || node.right;
  return (
    <table className={className}>
      <tr>
        <td colSpan={2}>{node.id}</td>
      </tr>
      {hasChildren ? (
        <tr>
          <td>
            <TreeNode
              deepestTree={deepestTree}
              node={node.left}
              isOddColor={!isOddColor}
            />
          </td>
          <td>
            <TreeNode
              deepestTree={deepestTree}
              node={node.right}
              isOddColor={!isOddColor}
            />
          </td>
        </tr>
      ) : null}
    </table>
  );
};
