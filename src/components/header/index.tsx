import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface HeaderProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    color: '#5c6bc0',
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
  },
});

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h3" gutterBottom>
        {title}
      </Typography>
    </div>
  );
};
