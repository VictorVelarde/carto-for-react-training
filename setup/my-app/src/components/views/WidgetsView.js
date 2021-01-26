import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';

import { AggregationTypes, FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react/widgets';
import { WrapperWidgetUI, CategoryWidgetUI } from '@carto/react/ui';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {

  }
}));

export default function WidgetsView() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const SOURCE_ID = `eduLayerSource`;
  const LAYER_ID = `eduLayer`;

  useEffect(() => {

    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `SELECT * FROM higher_edu_by_county`,
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


  const customData = [
    { "category": "categoryA", "value": 100 },
    { "category": "categoryB", "value": 100 },
    { "category": "categoryC", "value": 100 }
  ]

  return (
    <Grid container direction='column' className={classes.root}>

      <FormulaWidget
        id='higherEduPercent'
        title='Higher education (AVG)'
        dataSource='eduLayerSource'
        column='pct_higher_edu'
        operation={AggregationTypes.AVG}
        formatter={(value) => {
          try {
            return `${value.toFixed(2)}%`;
          } catch (exception) {
            return '';
          }
        }}
        viewportFilter
      ></FormulaWidget>

      <Divider />

      <CategoryWidget
        id='countyWinner'
        title='County winner'
        dataSource='eduLayerSource'
        column='county_winner'
        operation={AggregationTypes.COUNT}
        viewportFilter
      />

      <Divider />

      <HistogramWidget
        id='storesByRevenue'
        title='Voting dem party (%)'
        dataSource='eduLayerSource'
        operation={AggregationTypes.COUNT}
        column='pct_dem_r'
        ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
        viewportFilter
      ></HistogramWidget>

      <WrapperWidgetUI title="Custom widget">
        <Typography>
          This is a custom 'widget', with my own contents & logic, but using the same internal UI pieces
        </Typography>

        <Divider />

        {/* See https://storybook-react.carto.com/?path=/docs/widgets-categorywidgetui--default */}
        <CategoryWidgetUI data={customData}>
        </CategoryWidgetUI>
      </WrapperWidgetUI>

    </Grid>
  );
};
