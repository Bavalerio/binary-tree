import {
  Button,
  TextField,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import React from 'react';

interface TextAreaProps {
  value?: string;
  updateTree: (content: string) => void;
  setNodeText: (value: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  updateTree,
  setNodeText,
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      },
      textField: {
        position: 'relative',
        minWidth: '50%',
        justifyContent: 'center',
        marginBottom: '20px',
        marginLeft: '8px',
      },
      botton: {
        position: 'relative',
        width: '80px',
        height: '40px',
        marginLeft: '6px',
      },
    }),
  );

  const classes = useStyles();

  function processTree() {
    if (updateTree) {
      updateTree(value || '');
    }
  }

  function handleNodeTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textInput = e.target.value;
    setNodeText(textInput);
  }

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        onChange={handleNodeTextChange}
        value={value}
        id="json-content"
        label="Parsed as JSON"
        multiline
        rows={8}
        defaultValue=""
        variant="outlined"
      />

      <Button
        className={classes.botton}
        variant="contained"
        color="primary"
        onClick={processTree}
      >
        Process
      </Button>
    </div>
  );
};
