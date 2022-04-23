import pool from "./dbconn";
import dbg from "debug";
const debug = dbg("data:checkFlightExists");

const checkFlightExists = (num) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM flight WHERE num = ?",
				[num],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						if (result.length > 0) {
							resolve({
								success: false,
								message: "Flight Found",
							});
						} else {
							resolve({ success: true, message: "Flight not found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkFlightExists;
