import pool from "./dbconn";
import dbg from "debug";
import generateRandomTrackId from "../controllers/generateRandomTrackId";
const debug = dbg("data:addNewTrack");
const addNewTrack = (path, client_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var trackID = generateRandomTrackId();
			var values = { track_id: trackID, client_id: client_id };
			var valuesRoute = [];
			for (var i = 0; i < path.length; i++) {
				valuesRoute.push([
					trackID,
					i + 1,
					path[i].type,
					path[i].distance,
					path[i].duration,
					path[i].time,
					path[i].cost,
					path[i].src_pincode,
					path[i].dest_pincode,
				]);
			}
			connection.query("INSERT INTO track SET ?", [values], (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else {
					connection.query(
						"INSERT INTO trackRoute (track_id,pos,type,\
                        distance,duration,time,cost,src_pincode,dest_pincode) VALUES  ?",
						[valuesRoute],
						(err, result) => {
							if (err) {
								reject({ success: false, message: err });
							}
							resolve({ success: true, message: "Track added successfully" });
						}
					);
				}
			});
			connection.release();
		});
	});
};

export default addNewTrack;
