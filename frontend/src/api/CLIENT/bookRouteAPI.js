import axios from "axios";
import config from "../../config/config";

const bookRouteAPI = async (data) => {
	const { path, token } = data;
	//console.log(src_pincode, dest_pincode, token);
	return await axios
		.post(
			config.baseUrl + config.bookRoute,
			{
				path: path,
			},
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			//console.log(res.data.paths);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default bookRouteAPI;
