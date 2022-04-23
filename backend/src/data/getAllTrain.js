import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:getAllTrain");
const getAllTrain = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT e.*, ts.arrival,ts.departure,ts.distance, ts.pos,ts.day,rs.pincode as src_pincode,rs2.pincode as dest_pincode FROM edges e\
                JOIN trainSchedule ts ON e.source=ts.code AND ts.num=e.num\
                JOIN railStation rs ON e.source = rs.code\
                JOIN railStation rs2 ON e.destination = rs2.code\
                ",
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					}
					resolve({ success: true, data: { trains: result } });
				}
			);

			connection.release();
		});
	});
};
export default getAllTrain;
