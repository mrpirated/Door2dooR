import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import FindRoute from "./FindRoute";
import Login from "./Login";
import RouteDetails from "./RouteDetails";
import Signup from "./Signup";
import Reactmap from "./Reactmap";
import Navigation from "../COMMON/Navigation";
import Track from "../COMMON/Track";
import History from "./History";
import AboutPage from "../COMMON/AboutPage";
import { useSelector, useDispatch } from "react-redux";
function ClientRoute() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		//if(auth.checkToken )
		if (auth.checkToken && !(auth.isauth && auth.type === "client")) {
			navigate("/");
		}
	}, [auth]);
	return (
		<div>
			<Navigation />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='find-route' element={<FindRoute />} />
				<Route path='route-details' element={<RouteDetails />} />
				<Route path='track' element={<Track />} />
				<Route path='history' element={<History />} />
				<Route path='about' element={<AboutPage />} />
			</Routes>
		</div>
	);
}

export default ClientRoute;
