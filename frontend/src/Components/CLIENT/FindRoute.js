import React, {useState} from 'react';
import { Form, Modal, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { alertAdded, alertRemoved} from "../../store/alert";
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteTableColumns';
import {setLoading} from "../../store/auth";
// import tableData from './RouteTableData';
import findRoutesAPI from "../../api/CLIENT/findRoutesAPI";

function FindRoute() {
    const [src_pincode, setSrcPincode] = useState("");
	const [dest_pincode, setDestPincode] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [tableData, setTableData] = useState([]);
    const [resData, setResData] = useState([])
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
            dispatch(setLoading({ loading: true }));
			findRoutesAPI({
				src_pincode: src_pincode,
                dest_pincode: dest_pincode,
                token:auth.token
			}).then((res) => {
				console.log(res);
                var tempData = [];
                for(var i = 0; i < res.length; i++) {
                    var tempRow = {};
                    tempRow['srno'] = i+1;
                    tempRow['source'] = src_pincode;
                    tempRow['destination'] = dest_pincode;
                    tempRow['cost'] = 0;
                    tempRow['duration'] = res[i][res[i].length-1]['time'] + "min";
                    tempData.push(tempRow);
                }
                setTableData(tempData);
                setResData(res);
                dispatch(setLoading({ loading: true }));
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
            <DataTable columns={tableColumns} data={tableData} onclicklink={"/client/route-details"} resData={resData}/>
        </div>
    )
}

export default FindRoute