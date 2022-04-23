import dbg from "debug";
const debug = dbg("controller:checkToken");
import moment from "moment";
const findRailEdges = (schedule, stationList) => {
	return new Promise((resolve, reject) => {
		var first = null,
			second = null;

		var values = [];
		for (var i = 0; i < schedule.length; i++) {
			for (var j = 0; j < stationList.length; j++) {
				if (schedule[i].code == stationList[j].code) {
					if (first == null) {
						first = schedule[i];
					} else {
						second = schedule[i];

						var duration = moment(second.arrival, "HH:mm:ss").diff(
							moment(first.departure, "HH:mm:ss"),
							"minutes"
						);
						if (second.day > first.day) {
							duration += 24 * 60 * (second.day - first.day);
						}
						values.push({
							duration: duration,
							source: first.code,
							destination: second.code,
						});
						first = second;
						//firstday = secondday;
					}
					break;
				}
			}
		}
		resolve({ success: true, data: { edges: values } });
	});
};
export default findRailEdges;
