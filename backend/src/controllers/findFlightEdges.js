import dbg from "debug";
const debug = dbg("controller:findFlightEdges");
import moment from "moment";
const findFlightEdges = (schedule) => {
	return new Promise((resolve, reject) => {
		var duration = moment(schedule[1].arrival, "HH:mm:ss").diff(
			moment(schedule[0].departure, "HH:mm:ss"),
			"minutes"
		);
		if (schedule[1].day > schedule[0].day) {
			duration += 24 * 60 * (schedule[1].day - schedule[0].day);
		}
		var values = {
			type: 1,
			duration: duration,
			source: schedule[0].code,
			destination: schedule[1].code,
		};
		resolve({ success: true, data: { edges: values } });
	});
};
export default findFlightEdges;
