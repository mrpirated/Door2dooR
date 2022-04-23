import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addFlight");
const addFlight = async (num, name, days) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = { num: num, name: name, days: days };
			connection.query("INSERT INTO flight set ?", [values], (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else
					resolve({
						success: true,
						message: "Flight added successfully",
					});
			});
			connection.release();
		});
	});
};
export default addFlight;
