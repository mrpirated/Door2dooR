import axios from "axios";
import config from "../../config/config";

const loginAPI = async (data) => {
    const { phone, password, type } = data;
	console.log(config.baseUrl);
	return await axios
		.post(config.baseUrl + config.login, {
			phone: phone,
			password: password,
			type: type,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return { success: false, message: err.message };
		});
};
export default loginAPI;
