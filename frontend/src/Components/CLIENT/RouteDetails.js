import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import DataTable from "../COMMON/DataTable";
import tableColumns from "./RouteDetailsColumn";
import Reactmap from "./Reactmap";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/auth";
import bookRouteAPI from "../../api/CLIENT/bookRouteAPI";
import pincode from "pincode-lat-long";
import pintocity from "../../api/COMMON/pintocity";
import PintoCordinates from "../../api/COMMON/pintoCordinates";
import moment from "moment";
function RouteDetails(props) {
	const auth = useSelector((state) => state.auth);
	const location = useLocation();
	const routeDetails = location.state.data[location.state.idx - 1];
	const markers = location.state.markersGrp[location.state.idx - 1];
	const dispatch = useDispatch();
	const [tableData, setTableData] = useState([]);

	console.log(routeDetails, location.state.idx);
	console.log(markers);
	useEffect(() => {
		dispatch(setLoading({ loading: true }));
		var tempData = [];
		for (var i = 0; i < routeDetails.length; i++) {
			var tempRow = {};
			tempRow["srno"] = i + 1;
			// pintocity( routeDetails[i].src_pincode).then((res)=>
			// {
			//   PintoCordinates(res[0]['Name']).then((res) =>
			//   {
			//     var tempMarkers = markers;
			//     tempMarkers.push({anchorLat: res.data[0].latitude, anchorLng: res.data[0].longitude});
			//     setTimeout(setMarkers(tempMarkers), 200);
			//     // console.log(res.data[0].latitude,res.data[0].longitude);
			//   });
			// }
			// );
			tempRow["source"] = routeDetails[i].src_pincode;
			tempRow["destination"] = routeDetails[i].dest_pincode;
			tempRow["trainFlightRoad"] =
				routeDetails[i].type === 0
					? "Train"
					: routeDetails[i].type === 1
					? "Flight"
					: "Roadways";
			tempRow["distance"] = routeDetails[i].distance + "km";
			tempRow["duration"] = routeDetails[i].duration;
			tempRow["time"] = routeDetails[i].time;
			tempRow["cost"] = "Rs." + routeDetails[i].cost;
			tempData.push(tempRow);

			// tempMarkers.push({
			//   anchorLat: pincode.getlatlong(routeDetails[i].src_pincode)["lat"],
			//   anchorLng: pincode.getlatlong(routeDetails[i].src_pincode)["long"]
			// });
			// tempMarkers.push({
			//   anchorLat: pincode.getlatlong(routeDetails[i].dest_pincode)["lat"],
			//   anchorLng: pincode.getlatlong(routeDetails[i].dest_pincode)["long"]
			// });
		}
		console.log(markers);
		// setMarkers(tempMarkers);
		setTableData(tempData);
		dispatch(setLoading({ loading: false }));
	}, []);

	// const markers = [
	//   {
	//     anchorLat: 28.879,
	//     anchorLng: 77.6997,
	//   },
	//   {
	//     anchorLat: 27.9,
	//     anchorLng: 77.6998,
	//   },
	//   {
	//     anchorLat: 26.879,
	//     anchorLng: 77.5997,
	//   },
	//   {
	//     anchorLat: 28.079,
	//     anchorLng: 77.6897,
	//   },
	// ];
	const handleBook = () => {
		bookRouteAPI({ token: auth.token, path: routeDetails }).then((response) => {
			console.log(response);
		});
	};
	return (
		<div>
			{console.log(routeDetails)}
			<div className='row'>
				<label>Source</label>
				<input value={location.state.source} />
			</div>

			<div className='row'>
				<label>Destination</label>
				<input value={location.state.destination} />
			</div>

			<div className='row'>
				<label>Cost</label>
				<input value={location.state.cost} />
			</div>

			<div className='row'>
				<label>Duration</label>
				<input value={location.state.duration} />
			</div>

			<DataTable
				columns={tableColumns}
				data={tableData}
				onclicklink={"/client/route-details"}
			/>
			<div id='button' class='row'>
				<button style={{ width: "45%", fontSize: "15px" }} onClick={handleBook}>
					Book
				</button>
			</div>
			<div style={{ width: "200vw", height: "auto" }}>
				<Reactmap
					markers={markers}
					defaultLat={markers[0].anchorLat}
					defaultLng={markers[0].anchorLng}
				/>
			</div>
		</div>
	);
}

export default RouteDetails;
