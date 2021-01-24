import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import { setLoadDetailedLayers } from 'config/appSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export default function NewView() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const SOURCE_ID = `newLayerSource`;
    const LAYER_ID = `newLayer`;
    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `SELECT * FROM countries`,
        type: 'sql',
      })
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: SOURCE_ID,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);

  useEffect(() => {
    const SOURCE_ID = `myBqLayerSource`;
    const LAYER_ID = `myBqLayer`;

    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `cartobq.maps.nyc_taxi_points_demo_id`,
        type: 'bq',
      })
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: SOURCE_ID,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);

  const loadDetailedLayers = useSelector((state) => state.app.loadDetailedLayers);
  const handleLoadDetailedLayers = (event) => {
    dispatch(setLoadDetailedLayers(event.target.checked));
  };

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>Hello World</Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={loadDetailedLayers}
            onChange={handleLoadDetailedLayers}
            name='detailedLayers'
          />
        }
        label='Load detailed layers'
      />
    </Grid>
  );
}
