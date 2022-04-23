import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:getStationList");
const getStationList = async () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			//var values = { num: num, name: name, days: days };
			connection.query("SELECT * FROM railStation", (err, result) => {
				if (err) {
					reject({ success: false, message: err });
				} else
					resolve({
						success: true,
						message: "StationList returned successfully",
						data: { stationList: result },
					});
			});
			connection.release();
		});
	});
};
export default getStationList;
