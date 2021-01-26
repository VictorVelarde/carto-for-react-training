import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { buildQueryFilters } from '@carto/react/api';
import { selectSourceById } from '@carto/react/redux';
import htmlForFeature from 'utils/htmlForFeature';

export default function EduLayer() {
  const { eduLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, eduLayer?.source));

  if (eduLayer && source) {
    
    return new CartoSQLLayer({
      id: 'eduLayer',
      data: buildQueryFilters(source),
      credentials: source.credentials,
      lineWidthMinPixels: 1,
      getFillColor: [241, 109, 122],
      getLineColor: [238, 238, 238],
      pickable: true,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: htmlForFeature(info.object),
            style: { }
          };
        }
      }
    });
        
  }
}