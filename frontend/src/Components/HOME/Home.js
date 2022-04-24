import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
function Home() {
	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (auth.isauth) {
			if (auth.type == "admin") {
				navigate("/admin");
			} else if (auth.type == "client") {
				navigate("/client");
			}
		}
	});
	return <div>Home</div>;
}

export default Home;
