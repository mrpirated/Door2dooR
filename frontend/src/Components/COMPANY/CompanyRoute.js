import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

function CompanyRoute() {
    return (
        <div>
			<Routes>
				<Route path='login' element={<Login/>} />
				<Route path='signup' element={<Signup/>} />
			</Routes>
		</div>
    )
}

export default CompanyRoute