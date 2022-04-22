import axios from "axios";
import config from "../../config/config";

const signupAPI = async (data) => {
	const { type, phone, password} = data;
	return await axios
		.post(config.baseUrl + config.signup, {
			type,
			phone,
			password
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log("Error Occured in Signup:" + err);
		});
};

export default signupAPI;
