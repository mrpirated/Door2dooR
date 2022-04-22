import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:addTrainSchedule");
const addTrainSchedule = async (num, schedule) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			var values = [];
			for (var i = 0; i < schedule.length; i++) {
				values.push({
					num: num,
					code: schedule[i].code,
					arrival: schedule[i].arrival,
					departure: schedule[i].departure,
					pos: schedule[i].pos,
					day: schedule[i].day,
				});
			}
			connection.query(
				"INSERT INTO trainSchedule VALUES ?",
				[values],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					} else
						resolve({
							success: true,
							message: "Train added successfully",
						});
				}
			);
			connection.release();
		});
	});
};
export default addTrainSchedule;