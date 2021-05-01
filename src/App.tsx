import './App.css';

import { FileLoader, Header, OutputTree, TextArea } from './components/index';
import React, { useState } from 'react';
import { buildBinaryTree, findDeepestTree } from './utils';

import { BinaryTree } from './types';
import { useSnackbar } from 'notistack';

const App: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tree, setTree] = useState<BinaryTree>();
  const [deepestTree, setDeepestTree] = useState<BinaryTree>();
  const [nodeText, setNodeText] = useState<string>('');

  function getArrayToParse(nodeText: string | Record<string, unknown>): any[] {
    try {
      return typeof nodeText === 'string' ? JSON.parse(nodeText) : nodeText;
    } catch (error) {
      enqueueSnackbar('The JSON file is invalid', {
        variant: 'error',
      });
    }
    return [];
  }

  function transformTree(jsonFile: string | Record<string, unknown>) {
    closeSnackbar();
    const arrayToParse = getArrayToParse(jsonFile);
    try {
      const treeRoot = buildBinaryTree(arrayToParse);

      if (treeRoot) {
        const treeAsJSON = JSON.stringify(treeRoot, null, 2);
        setNodeText(treeAsJSON);
      } else {
        enqueueSnackbar('The content specified is not a valid array', {
          variant: 'error',
        });
        setNodeText('');
      }
    } catch (error) {
      if (error instanceof RangeError) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('An error occurred trying to build the binary tree', {
          variant: 'error',
        });
      }
      setNodeText('');
    }
  }

  function renderTree(jsonFile: string) {
    try {
      closeSnackbar();
      const treeRoot = JSON.parse(jsonFile);
      setTree(treeRoot);

      const deepestSubTree = findDeepestTree(treeRoot);
      setDeepestTree(deepestSubTree);

      enqueueSnackbar('The binary tree was draw successfully.', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('The JSON content is invalid', {
        variant: 'error',
      });
    }
  }

  return (
    <div className="app-container">
      <div className="app">
        <Header title={`Tree App`} />
        <FileLoader setFileContent={transformTree} />
        <TextArea
          value={nodeText}
          updateTree={renderTree}
          setNodeText={setNodeText}
        />
        <OutputTree deepestTree={deepestTree} tree={tree} />
      </div>
    </div>
  );
};

export default App;
