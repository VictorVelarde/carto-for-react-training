import GeocoderLayer from './GeocoderLayer';
import DynamicLayer from './DynamicLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    DynamicLayer(),
    // Auto import layers
  ];
};
