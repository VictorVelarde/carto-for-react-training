import { useSelector } from 'react-redux';
import { CartoSQLLayer, colorCategories } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function NewLayer() {
  const { newLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, newLayer?.source));

  if (newLayer && source) {
    return new CartoSQLLayer({
      id: 'newLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: colorCategories({
        attr: 'continent',
        domain: ['North America', 'Europe'],
        colors: 'Bold',
      }),
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
