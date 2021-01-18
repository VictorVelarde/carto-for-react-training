import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLayer,
  removeLayer,
  updateLayer,
  addSource,
  removeSource,
} from '@carto/react/redux';
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
  const SOURCE_ID = `dynamicLayerSource`;
  const LAYER_ID = `dynamicLayer`;

  const dispatch = useDispatch();
  const classes = useStyles();
  const dynamicLayer = useSelector((store) => store.carto.layers[LAYER_ID]);

  const BY_TYPE = 'type';
  const BY_REVENUE = 'revenue';

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
        layerAttributes: { styleType: BY_TYPE },
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch, SOURCE_ID, LAYER_ID]);

  const handleChange = (event) => {
    const mapType = event.target.value;
    dispatch(
      updateLayer({
        id: LAYER_ID,
        layerAttributes: { styleType: mapType },
      })
    );
  };

  return (
    <Grid container direction='row' className={classes.root}>
      <Grid item xs>
        {dynamicLayer ? (
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Stores map type</FormLabel>
            <RadioGroup
              aria-label='type'
              name='mapType'
              value={dynamicLayer.styleType}
              onChange={handleChange}
            >
              <FormControlLabel value={BY_TYPE} control={<Radio />} label='By type' />
              <FormControlLabel
                value={BY_REVENUE}
                control={<Radio />}
                label='By revenue'
              />
            </RadioGroup>
          </FormControl>
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </Grid>
  );
}
