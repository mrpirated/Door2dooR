import pool from "./dbconn";
import dbg from "debug";

const debug = dbg("data:getnextTrain");
import moment from "moment";
const getNextTrain = (avaitime, code) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject({ success: false, message: "Error In connection", error: err });
			}
			connection.query(
				"SELECT e.*, ts.arrival,ts.departure, ts.pos,ts.day,rs.pincode as src_pincode,rs2.pincode as dest_pincode FROM edges e\
                JOIN trainSchedule ts ON e.source=ts.code AND ts.num=e.num\
                JOIN railStation rs ON e.source = rs.code\
                JOIN railStation rs2 ON e.destination = rs2.code\
                WHERE e.source = ?\
                ",
				[code],
				(err, result) => {
					if (err) {
						reject({ success: false, message: err });
					}
					var values = result;
					for (var i = 0; i < values.length; i++) {
						var tp =
							moment(avaitime).format("YYYY-MM-DD") +
							" " +
							moment(values[i].departure, "HH:mm:ss").format("HH:mm:ss");
						//debug(tp);
						if (moment(tp).diff(moment(avaitime)) < 0) {
							tp = moment(tp).add(24, "hours");
						}
						values[i].date = moment(tp).toDate();
					}
					resolve({ success: true, data: { nextTrains: values } });
				}
			);

			connection.release();
		});
	});
};
export default getNextTrain;
