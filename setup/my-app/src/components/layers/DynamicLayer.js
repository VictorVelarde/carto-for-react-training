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

  if (dynamicLayer && source) {
    return new CartoSQLLayer({
      id: 'dynamicLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: storesByType,
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
