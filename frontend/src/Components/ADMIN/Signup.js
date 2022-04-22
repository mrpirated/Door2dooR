import React, { useState } from "react";
import { Form, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { alertAdded, alertRemoved} from "../../store/alert";
import config from "../../config/config";
import signupAPI from "../../api/ADMIN/signupAPI";

function Signup(props) {
    const dispatch = useDispatch();
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const alert = useSelector((state) => state.alert);
	const type = config.ADMIN;
	const navigate = useNavigate();
	const validateForm = () => {
		return phone.length > 0 && password.length > 0;
	};

	const handleSubmit = (event) => {
        event.preventDefault();
        console.log("done");
		if (validateForm()) {
			signupAPI({
				type,
				phone,
				password,
			}).then((res) => {
				console.log(res);
				if (res.success) {
                    console.log("done");
					navigate("/login");
				} else {
					alert(res.data.msg);
				}
			});
        }
	};

	return (
		<div>
			<div
				id='signupform'
				onClick={() => {
					dispatch(alertRemoved());
				}}
			>
				<div id='right-signup'>
					<img
						style={{ height: "100%", width: "100%", margin: "40% auto" }}
						src={"HEELLO"}
						alt={"doctor_logo"}
					/>
				</div>
				<div id='left-signup'>
					<Form onSubmit={handleSubmit} className='signup'>
						<div>
							<h2 id='headerTitle'>Register</h2>
							<Alert show={alert.show} variant={alert.variant}>
								{alert.message}
							</Alert>
							<div className='row'>
								<label>Phone Number</label>
								<PhoneInput
									// placeholder="Enter phone number"
									defaultCountry='IN'
									value={phone}
									style={{ width: "85%" }}
									onChange={setPhone}
								/>
							</div>
							<div className='row'>
								<label>Password</label>
								<input
									// placeholder="Enter your Last Name"
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
                            <div id='button' className='row'>
							<button type='submit'>
								Sign Up
							</button>
						</div>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
