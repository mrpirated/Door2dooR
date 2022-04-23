import dbg from "debug";
const debug = dbg("controller:getPincodeDistance");
import config from "../config";
import axios from "axios";
import moment from "moment";
const getPincodeDistance = async (src_pincode, dest_pincode) => {
	var src = src_pincode + " India";
	var dest = dest_pincode + " India";
	return await axios
		.get(
			"http://www.mapquestapi.com/directions/v2/route?key=" +
				config.MAP_QUEST_API_KEY +
				"&from=" +
				src +
				"&to=" +
				dest +
				"&unit=k"
		)
		.then((response) => {
			//debug(response.data);
			var dist = response.data.route.distance;
			var duration = moment
				.duration(response.data.route.formattedTime, "HH:mm:ss")
				.asMinutes();
			return { success: true, data: { distance: dist, duration: duration } };
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getPincodeDistance;
