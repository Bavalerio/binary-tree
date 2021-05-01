import React, { useState } from 'react';

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
  // const [nodeText, setNodeText] = useState<string>(value || '');

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
    <div>
      <textarea
        rows={5}
        cols={120}
        value={value}
        onChange={handleNodeTextChange}
      ></textarea>
      <button className="button" onClick={processTree}>{`Process`}</button>
    </div>
  );
};
