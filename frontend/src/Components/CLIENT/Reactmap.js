import React from 'react';
import { Map, Marker } from 'pigeon-maps';

function Reactmap() {
  return (
    <Map height={300} defaultCenter={[28.879, 77.6997]} defaultZoom={11}>
      <Marker width={50} anchor={[50.879, 4.6997]} />
    </Map>
  );
}
export default Reactmap;
