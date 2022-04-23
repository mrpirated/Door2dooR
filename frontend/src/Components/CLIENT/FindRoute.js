import React, {useState} from 'react';
import { Form, Modal, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { alertAdded, alertRemoved} from "../../store/alert";
import DataTable from '../COMMON/DataTable';
import tableColumns from './RouteTableColumns';
import tableData from './RouteTableData';

function FindRoute() {
    const [source, setSource] = useState("");
	const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch();
	const [openPopup, setopenPopup] = useState(false);
	const handleClose = () => setopenPopup(false);
    const alert = useSelector((state) => state.alert);
	

    const validateForm = () => {
		return source.length > 0 && destination.length > 0;
	};

    const handleSubmit = (event) => {
        event.preventDefault();
		if (validateForm()) {
            console.log("button clicked");
			// findRouteAPI({
			// 	source,
            //     destination,
            //     startDate
			// }).then((res) => {
			// 	console.log(res);
			// 	if (res.success) {
			// 		setopenPopup(true);
			// 	} else {
			// 		alert(res.data.msg);
			// 	}
			// });
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
                    <label>Source</label>
                    <input
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    />
                </div>

                <div className='row'>
                    <label>Destination</label>
                    <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>

                <div className='row'>
                    <label>Departure</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>

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