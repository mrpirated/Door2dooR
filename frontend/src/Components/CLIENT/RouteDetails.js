import React from 'react';
import { useNavigate, useLocation } from "react-router";
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteDetailsColumn';
import tableData from './RouteDetailsData';
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import Mapbox from '../COMMON/Mapbox';

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

            <DataTable columns={tableColumns} data={tableData} onclicklink={"/client/route-details"}/>

            <div style={{width: '100vw', height: '100vh'}}>
                <Mapbox/>
            </div>
        </div>
    )
}

export default RouteDetails