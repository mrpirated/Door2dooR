import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addStation");
const addStation = async (code, name, pincode) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = { code: code, name: name, pincode: pincode };
			connection.query(
				"INSERT INTO railStation set ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else
						resolve({
							success: true,
							message: "Station added successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default addStation;
