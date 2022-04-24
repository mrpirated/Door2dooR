import dbg from "debug";
const debug = dbg("service:login");
import checkIfUserExists from "../data/checkIfUserExists";
import checkPassword from "../controllers/checkPassword";
import getToken from "../controllers/getToken";
const loginService = async ({ type, phone, password }) => {
	var user_id;
	return await checkIfUserExists({ type, phone })
		.then((response) => {
			if (response.success) {
				return response;
			}
			return Promise.reject({
				success: false,
				message: "User Dosen't exists",
			});
		})
		.then((response) => {
			if (type == "client") user_id = response.data.user.client_id;
			else if (type == "admin") user_id = response.data.user.admin_id;
			return checkPassword(password, response.data.user.password);
		})
		.then((response) => {
			const token = getToken({ user_id: user_id, type: type }, "30d");
			return {
				success: true,
				message: "Successfully logged In",
				data: { token },
			};
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default loginService;
