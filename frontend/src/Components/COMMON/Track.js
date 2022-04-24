import React, { useState } from "react";
import { alertAdded, alertRemoved } from "../../store/alert";
import { useDispatch, useSelector } from "react-redux";
import Reactmap from "../CLIENT/Reactmap";
import trackRoutesAPI from "../../api/CLIENT/trackRoutesAPI";
import DataTable from "./DataTable";
import TrackColumn from "./TrackColumn";

const temp = [
	{
		anchorLat: 28.879,
		anchorLng: 77.6997,
	},
	{
		anchorLat: 27.9,
		anchorLng: 77.6998,
	},
	{
		anchorLat: 26.879,
		anchorLng: 77.5997,
	},
	{
		anchorLat: 28.079,
		anchorLng: 77.6897,
	},
];

function Track() {
	const auth = useSelector((state) => state.auth);
	const [trackID, setTrackID] = useState("");
	const dispatch = useDispatch();
  const [tableData, setTableData] = useState([])
	const validateForm = () => {
		return trackID.length > 0;
	};

	const [markers, setMarkers] = useState(temp);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm()) {
			trackRoutesAPI({
				token: auth.token,
				track_id: trackID,
			}).then((res) => {
				console.log(res.data.trackRoute);
        var tempData = [];
        for(var i = 0; i < res.data.trackRoute.length; i++) {
          var tempRow = {};
          tempRow["srno"] = res.data.trackRoute[i]["pos"];
          tempRow["trackID"] = res.data.trackRoute[i]["track_id"];
          tempRow["src_pincode"] = res.data.trackRoute[i]["src_pincode"];
          tempRow["dest_pincode"] = res.data.trackRoute[i]["dest_pincode"];
          tempRow["distance"] = res.data.trackRoute[i]["distance"] + "km";
          tempRow["duration"] = res.data.trackRoute[i]["duration"] + "min";
          tempRow["time"] = res.data.trackRoute[i]["time"] + "min";
          tempRow["type"] = res.data.trackRoute[i]["type"];
          tempRow["cost"] = res.data.trackRoute[i]["cost"];

          tempData.push(tempRow);
        }
        console.log(tempData);
        setTableData(tempData);
				// setMarkers([
				// 	{
				// 		anchorLat: res.data.lat,
				// 		anchorLong: res.data.long,
				// 	},
				// ]);
			});
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
				<input value={trackID} onChange={(e) => setTrackID(e.target.value)} />
			</div>
			<div id='button' class='row'>
				<button
					style={{ width: "45%", fontSize: "15px" }}
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
      <DataTable
				columns={TrackColumn}
				data={tableData}
			/>
			<div style={{ width: "200vw", height: "200vh" }}>
				<Reactmap markers={markers} defaultLat={28.879} defaultLng={77.6997} />
			</div>
		</div>
	);
}

export default Track;
