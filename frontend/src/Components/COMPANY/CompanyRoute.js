import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Order from './Orders' 
import Track from '../COMMON/Track';
import Navigation from './Navigation';
function CompanyRoute() {
    return (
        <div>
			<Navigation/>
			<Routes>
				<Route path='login' element={<Login/>} />
				<Route path='signup' element={<Signup/>} />
				<Route path='orders'element={<Order/>} />
				<Route path='track' element={<Track/>} />
			</Routes>
		</div>
    )
}

export default CompanyRoute