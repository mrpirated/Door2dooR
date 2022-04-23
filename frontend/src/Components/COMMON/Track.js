import React, {useState} from 'react'
import { alertAdded, alertRemoved } from '../../store/alert';
import { useDispatch, useSelector } from 'react-redux';
import Reactmap from '../CLIENT/Reactmap';


function Track() {
    const [trackID, setTrackID] = useState("");
    const dispatch = useDispatch();
    const validateForm = () => {
        return trackID.length > 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            // trackOrderAPI({
            //     trackID
            // }).then((res) => {
            //     console.log(res);
            //     if (res.success) {
                    
            //         // history.push("/home");
            //     } else {
            //         alert(res.data.msg);
            //     }
            // });
        } else {
            dispatch(
                alertAdded({
                    variant: "warning",
                    message: "Enter Correct Tracking ID.",
                })
            );
        }
    };

    return (
        <div>
            <div className='row'>
                <label>Tracking Id:</label>
                <input
                    // value={trackID}
                    // onChange={(e) => setTrackID(e.target.value)}
                />
            </div>
            <div id='button' class='row'>
                <button
                    style={{ width: "45%", fontSize: "15px" }}
                    // onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            {/* <Reactmap /> */}
        </div>
    )
}

export default Track