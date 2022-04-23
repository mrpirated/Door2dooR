import dbg from "debug";
const debug = dbg("service:admin/addFlight");
import checkFlightExists from "../../data/checkFlightExists";
import checkToken from "../../controllers/checkToken";
import addFlight from "../../data/addFlight";
import addFlightSchedule from "../../data/addFlightSchedule";
import addFlightEdge from "../../data/addFlightEdge";
import findFlightEdges from "../../controllers/findFlightEdges";
const addFlightService = async (token, { num, name, days, schedule }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return checkFlightExists(num);
		})
		.then((response) => {
			if (response.success) {
				return addFlight(num, name, days);
			} else {
				return Promise.reject({ success: false, message: response.message });
			}
		})
		.then((response) => {
			return addFlightSchedule(num, schedule);
		})
		.then((response) => {
			return findFlightEdges(schedule);
		})
		.then((response) => {
			var edge = response.data.edges;
			debug(edge);

			return addFlightEdge(num, edge.duration, edge.source, edge.destination);
		})
		.then((response) => {
			return Promise.resolve({
				success: true,
				message: "Flight Added Successfully",
			});
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addFlightService;
