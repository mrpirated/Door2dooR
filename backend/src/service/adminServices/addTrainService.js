import dbg from "debug";
const debug = dbg("service:admin/addStation");
import checkTrainExists from "../../data/checkTrainExists";
import checkToken from "../../controllers/checkToken";
import addTrain from "../../data/addTrain";
import addTrainSchedule from "../../data/addTrainSchedule";
import getStationList from "../../data/getStationList";
import findRailEdges from "../../controllers/findRailEdges";
import addRailEdge from "../../data/addRailEdge";
const addTrainService = async (token, { num, name, days, schedule }) => {
	var stationList;
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return checkTrainExists(num);
		})
		.then((response) => {
			if (response.success) {
				return addTrain(num, name, days);
			} else {
				return Promise.reject({ success: false, message: response.message });
			}
		})
		.then((response) => {
			return addTrainSchedule(num, schedule);
		})
		.then((response) => {
			return getStationList();
		})
		.then((response) => {
			stationList = response.data.stationList;
			return findRailEdges(schedule, stationList);
		})
		.then((response) => {
			var edges = response.data.edges;
			var alledges = [];
			debug(edges);
			for (var i = 0; i < edges.length; i++) {
				alledges.push(
					addRailEdge(
						num,
						edges[i].duration,
						edges[i].source,
						edges[i].destination
					)
				);
			}
			return Promise.all(alledges);
		})
		.then((response) => {
			return Promise.resolve({
				success: true,
				message: "Train Added Successfully",
			});
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addTrainService;
