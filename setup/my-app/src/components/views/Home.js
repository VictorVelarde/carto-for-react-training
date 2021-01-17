import React from 'react';

import { useDispatch } from 'react-redux';
import { setViewState } from '@carto/react/redux';

import { Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const goHome = () => {
    dispatch(setViewState({ longitude: -3.8124194, latitude: 43.451641, zoom: 11 }));
  };

  return (
    <div className={classes.root}>
      <Typography variant='h5' gutterBottom>
        Home
      </Typography>
      <Button variant='contained' color='primary' onClick={goHome}>
        Go Home
      </Button>
    </div>
  );
}
