import React, { useEffect } from "react";
import LoadingProvider from "./Components/COMMON/LoadingProvider";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/HOME/Home";
import ClientRoute from "./Components/CLIENT/ClientRoute";
import AdminRoute from "./Components/ADMIN/AdminRoute";
import CompanyRoute from "./Components/COMPANY/CompanyRoute";
import { setLoading, loggedWithToken, tokenChecked } from "./store/auth";
import tokenAPI from "./api/COMMON/tokenAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!auth.isauth && localStorage.getItem("token")) {
			dispatch(setLoading({ loading: true }));
			const token = JSON.parse(localStorage.getItem("token"));
			tokenAPI(token)
				.then((response) => {
					if (response.success) {
						console.log(response);
						dispatch(
							loggedWithToken({
								user: response.data.user,
								token: token,
								type: response.data.type,
							})
						);
					} else {
						dispatch(tokenChecked());
					}
				})
				.finally(() => {
					dispatch(setLoading({ loading: false }));
				});
		}
		document.title = "Door2dooR";
	}, []);
	return (
		<div className='App'>
			<LoadingProvider active={auth.isloading}>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/client/*' element={<ClientRoute />} />
					<Route path='/admin/*' element={<AdminRoute />} />
					<Route path='/company/*' element={<CompanyRoute />} />
				</Routes>
			</LoadingProvider>
		</div>
	);
}

export default App;
