import axios from "axios";
import config from "../../config/config";

const findRoutesAPI = async (data) => {
    const { src_pincode, dest_pincode, token } = data;
	return await axios
		.get(config.baseUrl + +
			"?src_pincode=" + src_pincode +
			"&dest_pincode=" + dest_pincode,
			{
				headers: { Authorization: "Bearer " + token },
			}
		)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default findRoutesAPI;
