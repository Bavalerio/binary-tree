import './App.css';

import { FileLoader, Header, OutputTree, TextArea } from './components/index';
import React, { useState } from 'react';

import { BinaryTree } from './types';
import { buildBinaryTree } from './utils';
import { useSnackbar } from 'notistack';

const App: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tree, setTree] = useState<BinaryTree>();
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

      const treeAsJSON = JSON.stringify(treeRoot, null, 2);
      setNodeText(treeAsJSON);
    } catch (error) {
      enqueueSnackbar('An error occurred trying to build the binary tree', {
        variant: 'error',
      });
    }
  }

  function renderTree(jsonFile: string) {
    try {
      closeSnackbar();
      const treeRoot = JSON.parse(jsonFile);
      setTree(treeRoot);
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
    <div className="App">
      <Header title={`Tree App`} />
      <main className="body">
        <FileLoader setFileContent={transformTree} />
        <TextArea
          value={nodeText}
          updateTree={renderTree}
          setNodeText={setNodeText}
        />
        <OutputTree tree={tree} />
      </main>
    </div>
  );
};

export default App;
