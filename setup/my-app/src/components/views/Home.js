import React from 'react';

import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h5' gutterBottom>
        Home
      </Typography>
      <Button variant='contained' color='primary'>
        Go Home
      </Button>
    </div>
  );
}
