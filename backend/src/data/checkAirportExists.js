import pool from "./dbconn";
import dbg from "debug";
const debug = dbg("data:checkAirportExists");

const checkAirportExists = (code) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM airport WHERE code = ?",
				[code],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						if (result.length > 0) {
							resolve({
								success: false,
								message: "Airport Found",
							});
						} else {
							resolve({ success: true, message: "Airport not found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkAirportExists;
