import { BinaryTree } from '../../types';
import { ReactNode } from 'react';

interface TreeNodeProps {
  node?: BinaryTree;
  isOddColor: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  isOddColor = true,
}) => {
  if (!node) {
    return <div className={'empty-box'}></div>;
  }

  const hasChildren = node.left || node.right;
  return (
    <table className={isOddColor ? 'oddNode' : 'evenNode'}>
      <tr>
        <td colSpan={2}>{node.id}</td>
      </tr>
      {hasChildren ? (
        <tr>
          <td>
            <TreeNode node={node.left} isOddColor={!isOddColor} />
          </td>
          <td>
            <TreeNode node={node.right} isOddColor={!isOddColor} />
          </td>
        </tr>
      ) : null}
    </table>
  );
};
