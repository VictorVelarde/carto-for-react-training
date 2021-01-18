import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function DynamicLayer() {
  const { dynamicLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, dynamicLayer?.source));

  const storesByType = (store) => {
    switch (store.properties.storetype) {
      case 'Supermarket':
        return [255, 0, 0, 50];
      case 'Hypermarket':
        return [0, 0, 255];
      default:
        return [0, 0, 0];
    }
  };

  const storesByRevenue = (store) => {
    const r = store.properties.revenue;

    const K = 1000;
    if (r < 1000 * K) {
      return [191, 63, 63, 10];
    } else if (r < 2000 * K) {
      return [153, 51, 51, 60];
    } else if (r < 3000 * K) {
      return [114, 38, 38, 150];
    } else {
      return [76, 25, 25, 255];
    }
  };

  if (dynamicLayer && source) {
    const selectedOption = dynamicLayer.styleType;
    const dynamicStyle = selectedOption === 'type' ? storesByType : storesByRevenue;

    return new CartoSQLLayer({
      id: 'dynamicLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: dynamicStyle,
      updateTriggers: {
        getFillColor: [selectedOption],
      },
      pointRadiusMinPixels: 4,
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
