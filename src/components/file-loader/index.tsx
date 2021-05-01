import '../../index.css';

import {
  Button,
  TextField,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Loader from '../loader';
import { useSnackbar } from 'notistack';

interface InputProps {
  setFileContent: (content: string | Record<string, unknown>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    card: {
      position: 'relative',
      marginBottom: '100px',
    },
    textField: {
      position: 'relative',
      minWidth: '50%',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    botton: {
      position: 'relative',
      width: '80px',
      height: '40px',
      display: 'row',
      float: 'right',
    },
  }),
);

export const FileLoader: React.FC<InputProps> = ({ setFileContent }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [fetchURL, setFetchURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

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

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          id="file-url"
          label="Source tree url"
          placeholder="Define the url to load the source tree"
          helperText="for example /mock/example-array-1.json "
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={fetchURL}
          onChange={handleChange}
        />
        <Button
          className={classes.botton}
          variant="contained"
          color="primary"
          onClick={doFetch}
        >
          Fetch
        </Button>
      </div>
    </>
  );
};
