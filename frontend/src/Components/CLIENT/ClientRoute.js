import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';

function ClientRoute() {
    return (
        <div>
			<Routes>
				<Route path='login' element={<Login/>} />
			</Routes>
		</div>
    )
}

export default ClientRoute