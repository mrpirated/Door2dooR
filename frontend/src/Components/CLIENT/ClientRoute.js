import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

function ClientRoute() {
    return (
        <div>
			<Routes>
				<Route path='login' element={<Login/>} />
				<Route path='client' element={<Signup/>} />
			</Routes>
		</div>
    )
}

export default ClientRoute