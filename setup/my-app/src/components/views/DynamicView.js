import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function DynamicView() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [mapType, setMapType] = useState('type');

  const SOURCE_ID = `dynamicLayerSource`;
  const LAYER_ID = `dynamicLayer`;

  useEffect(() => {
    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `SELECT * FROM retail_stores`,
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
  }, [dispatch, SOURCE_ID, LAYER_ID]);

  const handleChange = (event) => {
    setMapType(event.target.value);
  };

  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item xs>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Stores map type</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender1'
            value={mapType}
            onChange={handleChange}
          >
            <FormControlLabel value='type' control={<Radio />} label='By type' />
            <FormControlLabel value='revenue' control={<Radio />} label='By revenue' />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
