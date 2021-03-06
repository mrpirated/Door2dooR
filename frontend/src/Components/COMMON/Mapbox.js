import React, {useEffect, useRef, useState} from 'react'
import config from '../../config/config'
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFwMTAwMSIsImEiOiJjbDJhbzR4cngwM2JyM2NwN25sdW80NWNsIn0.ekbhe_aKhQLUL-nmF-6vTA';

const Mapbox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Mapbox