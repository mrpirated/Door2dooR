import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FindRoute from './FindRoute';
import Login from './Login';
import RouteDetails from './RouteDetails';
import Signup from './Signup';
import Reactmap from './Reactmap';
function ClientRoute() {
  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='find-route' element={<FindRoute />} />
        <Route path='route-details' element={<RouteDetails />} />
        <Route path='map' element={<Reactmap />} />
      </Routes>
    </div>
  );
}

export default ClientRoute;
