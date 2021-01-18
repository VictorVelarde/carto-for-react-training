import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function DynamicLayer() {
  const { dynamicLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, dynamicLayer?.source));

  if (dynamicLayer && source) {
    return new CartoSQLLayer({
      id: 'dynamicLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
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