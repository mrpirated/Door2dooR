import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { alertAdded, alertRemoved } from '../../store/alert';
import config from '../../config/config';
import signupAPI from '../../api/ADMIN/signupAPI';

function Signup(props) {
  const dispatch = useDispatch();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [code, setCode] = useState("");
const [openPopup, setopenPopup] = useState(props.openPopup);
const handleClose = () => setopenPopup(false);
const alert = useSelector((state) => state.alert);
const type = config.CLIENT;
const navigate = useNavigate();
const validateForm = () => {
  return name.length > 0 && email.length > 0 && phone.length > 0 && password.length > 0 && confirmPassword.length > 0;
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (validateForm() && password === confirmPassword) {
    signupAPI({
      type,
      name,
      email,
      phone,
      password,
    }).then((res) => {
      console.log(res);
      if (res.success) {
        setopenPopup(true);
        // history.push("/home");
      } else {
        alert(res.data.msg);
      }
    });
  } else if (password !== confirmPassword) {
    dispatch(
      alertAdded({
        variant: "warning",
        message: "Password and Confirm Password should match.",
      })
    );
  }
};

const handleOTPSubmit = (event) => {
  event.preventDefault();
  if (validateForm() && password === confirmPassword) {
    signupAPI({
      type,
      name,
      email,
      phone,
      password,
      otp: code,
    }).then((res) => {
      console.log(res);
      if (res.success) {
        setopenPopup(false);
        alertAdded({
          variant: "success",
          message: "Registered Successfully",
        });
        navigate("/client/login");
      } else {
        alert(res.message);
      }
    });
  } else if (password !== confirmPassword) {
    alertAdded({
      variant: "warning",
      message: "Password and Confirm Password should match.",
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
          alt={"logistic_logo"}
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
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <label>Email</label>
              <input
                // placeholder="Enter your Last Name"

                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className='row'>
              <label>Confirm Password</label>
              <input
                // placeholder="Enter your Last Name"
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div id='button' class='row'>
              <button
                style={{ width: "45%", fontSize: "15px" }}
                type='submit'
                disabled={!validateForm()}
              >
                Get OTP
              </button>
            </div>
            <Modal show={openPopup} onHide={handleClose}>
              <Modal.Header closeButton className='modal-header'>
                <Modal.Body className='modal-body'>
                  <div className='row'>
                    <label style={{ color: "black", fontSize: "30px" }}>
                      Enter OTP
                    </label>
                    <input
                      type='text'
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className='row'>
                    <label style={{ color: "black" }}>
                      OTP sent to phone number {phone}
                    </label>
                  </div>
                  <div id='button' class='row'>
                    <button
                      style={{ width: "45%", fontSize: "15px" }}
                      onClick={handleOTPSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Modal.Body>
              </Modal.Header>
            </Modal>
            {/* <Button block size='lg' type='submit' disabled={!validateForm()}>
                Submit
              </Button> */}
          </div>
        </Form>
      </div>
    </div>
  </div>
);
}

export default Signup;
