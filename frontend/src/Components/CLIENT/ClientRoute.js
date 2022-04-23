import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FindRoute from './FindRoute';
import Login from './Login';
import RouteDetails from './RouteDetails';
import Signup from './Signup';
import Reactmap from './Reactmap';
import Navigation from '../COMMON/Navigation';
import Track from '../COMMON/Track';
function ClientRoute() {
	return (
		<div>
			<Navigation/>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='find-route' element={<FindRoute />} />
				<Route path='route-details' element={<RouteDetails />} />
				<Route path='track' element={<Track />} />
			</Routes>
		</div>
	);
}

export default ClientRoute;
