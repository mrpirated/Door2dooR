import axios from "axios";
import config from "../../config/config";

const initialState = async (token) => {
	//console.log(token);
	return await axios
		.get(config.baseUrl + config.token, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch();
	//console.log(user);
	//console.log(patient_id);
	//return user;
};
export default initialState;
