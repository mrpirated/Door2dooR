import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addNewUser");
const addNewUser = async (user) => {
	return new Promise((resolve, reject) => {
		var values;
		if (user.type === "admin") {
			values = {
				email: user.email,
				phone: user.phone,
				password: user.password,
			};
		} else {
			values = {
				name: user.name,
				email: user.email,
				phone: user.phone,
				password: user.password,
			};
		}
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"INSERT INTO ?? set ?",
				[user.type, values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else resolve({ success: true, message: result, user: user });
				}
			);
			connection.release();
		});
	});
};
export default addNewUser;
