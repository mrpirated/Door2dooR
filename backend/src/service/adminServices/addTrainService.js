import dbg from "debug";
const debug = dbg("service:admin/addStation");
import checkTrainExists from "../../data/checkTrainExists";
import checkToken from "../../controllers/checkToken";
import addTrain from "../../data/addTrain";
import addTrainSchedule from "../../data/addTrainSchedule";
const addStationService = async (token, { num, name, days, schedule }) => {
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
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addStationService;
