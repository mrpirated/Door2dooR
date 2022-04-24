import axios from "axios";
import config from "../../config/config";

const trackRoutesAPI = async (data) => {
	const { track_id, token } = data;
	return await axios
		.get(config.baseUrl + config.trackRoute + "?track_id=" + track_id, {
			headers: { Authorization: "Bearer " + token },
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default trackRoutesAPI;
