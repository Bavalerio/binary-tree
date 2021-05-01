import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';

import { BinaryTree } from '../../types';
import { TreeGraph } from '../tree-graph';
import { TreeNode } from '../tree-node';

interface OutputTreeProps {
  tree?: BinaryTree;
  deepestTree?: BinaryTree;
}

enum RenderType {
  HTML = 'HTML',
  REACT_TREE_GRAPH_HORIZONTAL = 'REACT_TREE_GRAPH_HORIZONTAL',
  REACT_TREE_GRAPH_VERTICAL = 'REACT_TREE_GRAPH_VERTICAL',
}

export const OutputTree: React.FC<OutputTreeProps> = ({
  tree,
  deepestTree,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      },
      formControl: {
        position: 'relative',
        minWidth: '50%',
        justifyContent: 'center',
        marginBottom: '20px',
      },
    }),
  );

  const [renderAs, setRenderAs] = useState<RenderType>(RenderType.HTML);
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRenderAs((event.target as HTMLInputElement).value as RenderType);
  };

  const RenderContent = () => {
    if (!tree) {
      return (
        <div>
          <Typography variant="h6" color="primary" component="h2" gutterBottom>
            EMPTY
          </Typography>
        </div>
      );
    }
    switch (renderAs) {
      case RenderType.HTML:
        return (
          <TreeNode deepestTree={deepestTree} node={tree} isOddColor={true} />
        );

      case RenderType.REACT_TREE_GRAPH_HORIZONTAL:
        return (
          <TreeGraph
            deepestTree={deepestTree}
            node={tree}
            showVertical={false}
          />
        );
      case RenderType.REACT_TREE_GRAPH_VERTICAL:
        return (
          <TreeGraph
            deepestTree={deepestTree}
            node={tree}
            showVertical={true}
          />
        );
      default:
        return <div>INVALID RENDER TYPE</div>;
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.formControl}>
          <Typography variant="h6" component="h3" gutterBottom color="primary">
            Render Tree As ...
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-label="display-type"
          name="display-type"
          value={renderAs}
          onChange={handleChange}
        >
          <FormControlLabel
            value={RenderType.HTML}
            control={<Radio color="primary" />}
            label="HTML"
          />
          <FormControlLabel
            value={RenderType.REACT_TREE_GRAPH_HORIZONTAL}
            control={<Radio color="primary" />}
            label="Third party library(react-tree-graph) - Vertical"
          />
          <FormControlLabel
            value={RenderType.REACT_TREE_GRAPH_VERTICAL}
            control={<Radio color="primary" />}
            label="Third party library(react-tree-graph) - Horizontal"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <RenderContent />
      </FormControl>
    </div>
  );
};
