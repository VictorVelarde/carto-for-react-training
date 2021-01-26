import GeocoderLayer from './GeocoderLayer';
import DynamicLayer from './DynamicLayer';
import NewLayer from './NewLayer';
import MyBqLayer from './MyBqLayer';
import EduLayer from './EduLayer';
// Auto import

export const getLayers = () => {
  return [
    GeocoderLayer(),
    DynamicLayer(),
    NewLayer(),
    MyBqLayer(),
    EduLayer(),
    // Auto import layers
  ];
};
