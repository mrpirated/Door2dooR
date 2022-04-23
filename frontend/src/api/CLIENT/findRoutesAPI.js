import axios from "axios";
import config from "../../config/config";

const findRoutesAPI = async (data) => {
    const { src_pincode, dest_pincode, token } = data;
    console.log(src_pincode, dest_pincode, token);
	return await axios
		.get(config.baseUrl + config.findFastestRoute +
			"?src_pincode=" + src_pincode +
			"&dest_pincode=" + dest_pincode,
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
            console.log(res.data.paths);
			return res.data.paths;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default findRoutesAPI;
