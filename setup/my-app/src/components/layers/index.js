import GeocoderLayer from './GeocoderLayer';
import DynamicLayer from './DynamicLayer';
import NewLayer from './NewLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    DynamicLayer(),
    NewLayer(),
    // Auto import layers
  ];
};
