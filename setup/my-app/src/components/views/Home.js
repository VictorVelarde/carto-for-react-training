import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setViewState, setBasemap } from '@carto/react/redux';
import { POSITRON, VOYAGER, DARK_MATTER, GOOGLE_ROADMAP, GOOGLE_SATELLITE, GOOGLE_HYBRID } from '@carto/react/basemaps';

import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';

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


  const basemap = useSelector((state) => state.carto.basemap);
  const handleBasemapChange = (event) => {
    debugger;
    const selected = event.target.value;
    dispatch(setBasemap(selected));
  }

  return (
    <div className={classes.root}>
      <Typography variant='h5' gutterBottom>
        Home
      </Typography>

      {/* Basemap selector */}
      <FormControl>
        <InputLabel id="basemapSelectorLabel">Basemap</InputLabel>
        <Select
          labelId="basemapSelectorLabel"
          id="basemapSelector"
          value={basemap}
          onChange={handleBasemapChange}
        >
          <MenuItem value={POSITRON}>Positron</MenuItem>
          <MenuItem value={VOYAGER}>Voyager</MenuItem>
          <MenuItem value={DARK_MATTER}>Dark matter</MenuItem>
          <MenuItem value={GOOGLE_ROADMAP}>G. Roadmap</MenuItem>
          <MenuItem value={GOOGLE_SATELLITE}>G. Satellite</MenuItem>
          <MenuItem value={GOOGLE_HYBRID}>G. Hybrid</MenuItem>
        </Select>
      </FormControl>

      {/* Center coordinates */}
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
