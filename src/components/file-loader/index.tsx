import '../../index.css';

import React, { useEffect, useState } from 'react';

import Loader from '../loader';
import { useSnackbar } from 'notistack';

interface InputProps {
  setFileContent: (content: string | Record<string, unknown>) => void;
}

export const FileLoader: React.FC<InputProps> = ({ setFileContent }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [fetchURL, setFetchURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetchArrayFromUrl(fetchURL);
    }
  }, [isLoading]);

  async function fetchArrayFromUrl(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFileContent(json);
    } catch (error) {
      enqueueSnackbar(`An error occurred trying to read ${url}`, {
        variant: 'error',
      });
    }
    setIsLoading(false);
  }

  function doFetch() {
    setIsLoading(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    setFetchURL(url);
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <input
        type="text"
        className="input"
        value={fetchURL}
        onChange={handleChange}
      />

      <button className="button" onClick={doFetch}>{`Fetch`}</button>
    </div>
  );
};
