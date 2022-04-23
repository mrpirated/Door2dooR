import dbg from "debug";
const debug = dbg("controller:getPincodeDistance");
import config from "../config";
import axios from "axios";
import moment from "moment";
const getPincodeDistance = async (src_pincode, dest_pincode) => {
	if (src_pincode === dest_pincode) {
		return { success: true, data: { distance: 0, duration: 0 } };
	}
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
			// debug({ src_pincode, dest_pincode });
			// debug({ distance: dist, duration: duration });
			return {
				success: true,
				data: {
					distance: parseFloat(dist).toFixed(2),
					duration: parseFloat(duration * 1.5).toFixed(2),
					// lng: response.data.route.boundingBox.lr.lng,
					// lat: response.data.route.boundingBox.lr.lat,
					src_pincode: src_pincode,
					dest_pincode: dest_pincode,
				},
			};
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default getPincodeDistance;
