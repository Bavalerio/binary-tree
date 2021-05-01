import '../../index.css';

import { BinaryTree } from '../../types';
import React from 'react';
import { TreeNode } from '../tree-node';

interface OutputTreeProps {
  tree?: BinaryTree;
}

export const OutputTree: React.FC<OutputTreeProps> = ({ tree }) => {
  if (!tree) {
    return <div className="output-container">EMPTY</div>;
  }
  return (
    <div className="output-container">
      <TreeNode node={tree} isOddColor={true} />
    </div>
  );
};
