import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import AddTrain from "./AddTrain";
import AddStation from "./AddStation";
import EditSchedule from "./EditSchedule";
import Signup from "./Signup";
import { useSelector, useDispatch } from "react-redux";
function AdminRoute() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && auth.type === "admin")) {
			navigate("/");
		}
	}, [auth]);
	return (
		<div>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='addtrain' element={<AddTrain />} />
				<Route path='addStation' element={<AddStation />} />
				<Route path='editSchedule' element={<EditSchedule />} />
			</Routes>
		</div>
	);
}

export default AdminRoute;
