import dbg from "debug";
const debug = dbg("controller:getUser");
import pool from "./dbconn";

const getUser = (decoded) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT * FROM ?? WHERE ??=?",
				[decoded.type, decoded.type + "_id", decoded.user_id],
				(err, result) => {
					if (err) {
						debug(err);
						reject({ success: false, message: err });
					} else {
						//debug(result);
						if (result[0]) {
							resolve({
								success: true,
								message: "User Details Found",
								data: { user: result[0], type: decoded.type },
							});
						} else {
							reject({ success: false, message: "No user found" });
						}
					}
				}
			);
			connection.release();
		});
	});
};
export default getUser;
