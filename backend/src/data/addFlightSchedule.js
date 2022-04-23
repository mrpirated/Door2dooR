import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addFlightSchedule");
const addFlightSchedule = async (num, schedule) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = [];
			for (var i = 0; i < schedule.length; i++) {
				values.push([
					num,
					schedule[i].code,
					schedule[i].arrival,
					schedule[i].departure,
					schedule[i].pos,
					schedule[i].day,
				]);
			}
			debug(values);
			connection.query(
				"INSERT INTO  flightSchedule (num,code,arrival,departure,pos,day) VALUES ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else
						resolve({
							success: true,
							message: "Flight added successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default addFlightSchedule;
