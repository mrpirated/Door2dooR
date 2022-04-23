import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:getAirport");
const getAirport = async () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			//var values = { num: num, name: name, days: days };
			connection.query("SELECT * FROM airport", (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else
					resolve({
						success: true,
						message: "Airport returned successfully",
						data: { airport: result },
					});
			});
			connection.release();
		});
	});
};
export default getAirport;
