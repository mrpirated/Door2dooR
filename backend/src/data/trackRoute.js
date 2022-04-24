import dbg from "debug";
const debug = dbg("controller:trackRoute");
import pool from "./dbconn";

const trackRoute = (track_id) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM trackRoute WHERE track_id = ?",
				[track_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);
						resolve({
							success: true,
							message: "Track Route found",
							data: { trackRoute: result },
						});
					}
				}
			);
			connection.release();
		});
	});
};
export default trackRoute;
