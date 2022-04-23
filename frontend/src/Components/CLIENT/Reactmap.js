import React from 'react';
import { Map, Marker } from 'pigeon-maps';

function Reactmap(props) {
  /*
    defaultCenter={[28.879, 77.6997]}
    anchor={[28.879, 77.6997]}
  */
  return (
    <Map height={500} defaultCenter={[props.defaultLat, props.deafaultLng]} defaultZoom={11}>
      {/* <Marker width={30} anchor={[28.879, 77.6997]} /> */}
      {
        props.markers.map((m) => {
          console.log(m);
          return (
            <Marker width={30} anchor={[m.anchorLat, m.anchorLng]} />
          )
        })
      }
    </Map>
  );
}
export default Reactmap;
