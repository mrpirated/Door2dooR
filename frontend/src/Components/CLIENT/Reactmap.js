import React from 'react';
import { Map, Marker } from 'pigeon-maps';

function Reactmap(props) {
  /*
    defaultCenter={[28.879, 77.6997]}
    anchor={[28.879, 77.6997]}
  */
  console.log(props.markers);
  return (
    // <Map height={300} defaultCenter={[28.879, 77.6997]} defaultZoom={11}>
    //   <Marker width={50} anchor={[50.879, 4.6997]} />
    // </Map>
    <Map height={500} defaultCenter={[props.defaultLat, props.defaultLng]} defaultZoom={9}>
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
