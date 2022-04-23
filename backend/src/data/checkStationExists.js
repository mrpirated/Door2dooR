import pool from "./dbconn";
import dbg from "debug";
const debug = dbg("data:checkStationExists");

const checkStationExists = (code) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM railStation WHERE code = ?",
				[code],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						if (result.length > 0) {
							resolve({
								success: false,
								message: "Station Found",
							});
						} else {
							resolve({ success: true, message: "Station not found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkStationExists;
