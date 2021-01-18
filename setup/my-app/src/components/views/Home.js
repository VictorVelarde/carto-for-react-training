import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setViewState } from '@carto/react/redux';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
  },
  coordinates: {
    padding: theme.spacing(1),
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.carto.viewState);
  const classes = useStyles();

  const goHome = () => {
    dispatch(setViewState({ longitude: -3.8124194, latitude: 43.451641, zoom: 11 }));
  };

  return (
    <div className={classes.root}>
      <Typography variant='h5' gutterBottom>
        Home
      </Typography>

      <TextField
        label='Longitude'
        value={viewState.longitude}
        variant='filled'
        disabled
        className={classes.coordinates}
      />

      <TextField
        label='Latitude'
        value={viewState.latitude}
        variant='filled'
        disabled
        className={classes.coordinates}
      />

      <Button variant='contained' color='primary' onClick={goHome}>
        Go Home
      </Button>
    </div>
  );
}
