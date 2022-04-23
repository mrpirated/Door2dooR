import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteDetailsColumn';
import tableData from './RouteDetailsData';
import Reactmap from './Reactmap';

function RouteDetails(props) {
  const location = useLocation();
  const routeDetails = location.state.data;

  const markers = [
    {
        anchorLat: 28.879,
        anchorLng: 77.6997
    },{
        anchorLat: 27.900,
        anchorLng: 77.6998
    },{
        anchorLat: 26.879,
        anchorLng: 77.5997
    },{
        anchorLat: 28.079,
        anchorLng: 77.6897
    },
  ]

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

      <div style={{ width: '200vw', height: '200vh' }}>
        <Reactmap markers={markers} defaultLat={28.879} defaultLng={77.6997}/>
      </div>
    </div>
  );
}

export default RouteDetails;
