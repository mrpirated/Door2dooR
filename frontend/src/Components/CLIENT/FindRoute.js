import React, {useState} from 'react';
import { Form, Modal, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { alertAdded, alertRemoved} from "../../store/alert";
import { useSelector } from "react-redux";
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteTableColumns';
import tableData from './RouteTableData';
import findRoutesAPI from "../../api/CLIENT/findRoutesAPI";

function FindRoute() {
    const [src_pincode, setSrcPincode] = useState("");
	const [dest_pincode, setDestPincode] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
	const [openPopup, setopenPopup] = useState(false);
	const handleClose = () => setopenPopup(false);
    const alert = useSelector((state) => state.alert);
	const auth = useSelector((state) => state.auth);

    const validateForm = () => {
		return src_pincode.length > 0 && dest_pincode.length > 0;
	};

    const handleSubmit = (event) => {
        event.preventDefault();
		if (validateForm()) {
            console.log("button clicked");
			findRoutesAPI({
				src_pincode: src_pincode,
                dest_pincode: dest_pincode,
                token:auth.token
			}).then((res) => {
				console.log(res);
				if (res.success) {
					setopenPopup(true);
				} else {
					alert(res.data.msg);
				}
			});
		} else{
			dispatch(
				alertAdded({
					variant: "warning",
					message: "Check the entered data.",
				})
			);
		}
    }
	
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <label>Source Postal Code</label>
                    <input
                        value={src_pincode}
                        onChange={(e) => setSrcPincode(e.target.value)}
                    />
                </div>

                <div className='row'>
                    <label>Destination Postal Code</label>
                    <input
                        value={dest_pincode}
                        onChange={(e) => setDestPincode(e.target.value)}
                    />
                </div>

                {/* <div className='row'>
                    <label>Departure</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div> */}

                <div id='button' class='row'>
                    <button
                        style={{ width: "45%", fontSize: "15px" }}
                        type='submit'
                        disabled={!validateForm()}
                    >
                        Search
                    </button>
                </div>
            </Form>
            <DataTable columns={tableColumns} data={tableData} onclicklink={"/client/route-details"}/>
        </div>
    )
}

export default FindRoute