import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { alertAdded, alertRemoved } from '../../store/alert';
import { Alert, Form, Button } from 'react-bootstrap';
// import loginAPI from "../../api/loginAPI";
import { loggedIn } from '../../store/auth';
import { Link } from 'react-router-dom';
import config from '../../config/config';
import loginAPI from '../../api/COMMON/loginAPI';
import "../../styles/login.css";

function LoginComponent(props) {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const type = props.type;
	const alert = useSelector((state) => state.alert);
	function validateForm() {
		return phone.length > 0 && password.length > 0;
	}
    function handleSubmit(event) {
		event.preventDefault();
		loginAPI({
			phone: phone,
			password: password,
			type: type,
		}).then((res) => {
			//console.log(res);
			if (res.success) {
				dispatch(
					loggedIn({
						user: res.data.user,
						token: res.data.token,
						type: type,
					})
				);
				// console.log("SUCCESSFUL");
				if (type === config.CLIENT) navigate("/client/find-route");
				else if (type === config.COMPANY) navigate("/company/orders");
				else navigate(config.admin);
			} else {
				dispatch(alertAdded({ variant: "danger", message: res.message }));
			}
		});
	}

    return (
        <div
			id='loginform'
			onClick={() => {
				dispatch(alertRemoved());
			}}
		>
			<div id='left'>
				<img
					style={{ height: "120%", width: "100%", margin: "auto" }}
					// src={props.doctorLogo}
					alt={"logistic_logo"}
				/>
			</div>
			<div id='right'>
				<Form onSubmit={handleSubmit}>
					<div>
						<h2 id='headerTitle'>Login</h2>
						<Alert show={alert.show} variant={alert.variant}>
							{alert.message}
						</Alert>
						<div className='row'>
							<label>Phone</label>
							<input
								autoFocus
								// placeholder='Enter your email'
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div className='row'>
							<label>Password</label>
							<input
								type='password'
								// placeholder='Enter your password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className='row'>
							<Link to={`/${type}/forgot`}>Forgot Password</Link>
						</div>
						<div id='button' className='row'>
							<button type='submit'>
								Log in
							</button>
						</div>
					</div>
				</Form>
			</div>
		</div>
    )
}

export default LoginComponent;
