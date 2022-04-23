import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addFlightEdge");
const addFlightEdge = async (num, duration, source, destination) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = {
				type: 1,
				num: num,
				duration: duration,
				source: source,
				destination: destination,
			};
			connection.query("INSERT INTO edges set ?", [values], (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else
					resolve({
						success: true,
						message: "Edge added successfully",
					});
			});
			connection.release();
		});
	});
};
export default addFlightEdge;
