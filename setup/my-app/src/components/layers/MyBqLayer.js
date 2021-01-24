import { useSelector } from 'react-redux';
import { CartoBQTilerLayer, colorContinuous } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function MyBqLayer() {
  const { myBqLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, myBqLayer?.source));
  const loadDetailedLayers = useSelector((state) => state.app.loadDetailedLayers);

  if (myBqLayer && source && loadDetailedLayers) {
    return new CartoBQTilerLayer({
      id: 'myBqLayer',
      data: source.data,
      credentials: source.credentials,
      getFillColor: colorContinuous({
        attr: 'avg_fare_amount',
        domain: [5, 30],
        colors: 'Sunset',
      }),
      getLineWidth: 0,
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: {},
          };
        }
      },
    });
  }
}
