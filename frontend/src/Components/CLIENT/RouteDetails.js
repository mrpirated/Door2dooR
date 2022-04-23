import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteDetailsColumn';
import tableData from './RouteDetailsData';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    />
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

function RouteDetails(props) {
  const location = useLocation();
  const routeDetails = location.state.data;
  return (
    <div>
      {console.log(routeDetails)}
      <div className='row'>
        <label>Source</label>
        <input value={routeDetails.source} />
      </div>

      <div className='row'>
        <label>Destination</label>
        <input value={routeDetails.destination} />
      </div>

      <div className='row'>
        <label>Departure</label>
        <input value={routeDetails.departure} />
      </div>

      <div className='row'>
        <label>Arrival</label>
        <input value={routeDetails.arrival} />
      </div>

      <div className='row'>
        <label>Cost</label>
        <input value={routeDetails.cost} />
      </div>

      <div className='row'>
        <label>Duration</label>
        <input value={routeDetails.duration} />
      </div>

      <DataTable
        columns={tableColumns}
        data={tableData}
        onclicklink={'/client/route-details'}
      />

      <div style={{ width: '100vw', height: '100vh' }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default RouteDetails;
