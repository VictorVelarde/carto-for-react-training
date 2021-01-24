import GeocoderLayer from './GeocoderLayer';
import DynamicLayer from './DynamicLayer';
import NewLayer from './NewLayer';
import MyBqLayer from './MyBqLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    DynamicLayer(),
    NewLayer(),
    MyBqLayer(),
    // Auto import layers
  ];
};
