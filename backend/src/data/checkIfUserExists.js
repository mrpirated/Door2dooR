import pool from "./dbconn";
import dbg from "debug";
const debug = dbg("data:checkIfUserExists");

const checkIfUserExists = ({ type, phone }) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM ?? WHERE phone = ?",
				[type, phone],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						if (result.length > 0) {
							resolve({
								success: true,
								message: "User Found",
								data: { user: result[0] },
							});
						} else {
							resolve({ success: false, message: "User not found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default checkIfUserExists;
