import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Login';

function AdminRoute() {
    return (
        <div>
			<Routes>
				<Route path='login' element={<Login/>} />
			</Routes>
		</div>
    )
}

export default AdminRoute