import dbg from "debug";
const debug = dbg("service:signup");
import checkIfUserExists from "../data/checkIfUserExists";
import hashPassword from "../controllers/hashPassword";
import addNewUser from "../data/addNewUser";
import twilioOTP from "../controllers/twilioOTP";
import loginService from "./loginService";
const signupService = async (user) => {
	debug(user);
	if (user.otp == undefined) {
		return await checkIfUserExists(user)
			.then((response) => {
				//debug(response.length);
				if (response.success) {
					return Promise.reject({
						success: false,
						message: "User Already Exists",
					});
				}
				return twilioOTP(user);
			})
			.catch((err) => {
				return err;
			});
	} else {
		debug(user);
		var password = user.password;
		return await checkIfUserExists(user)
			.then((response) => {
				if (response.success) {
					return Promise.reject({
						success: false,
						message: "User Already Exists",
					});
				}
				return user;
			})
			.then((user) => {
				return twilioOTP(user);
			})
			.then((response) => {
				debug(response);
				user.password = hashPassword(user.password);
				if (response == "approved") {
					return user;
				}
				return Promise.reject({ success: false, message: "Invalid OTP" });
			})
			.then((user) => {
				return addNewUser(user);
			})
			.then((response) => {
				if (response.success) {
					return loginService({
						type: response.user.type,
						phone: response.user.phone,
						password: password,
					});
				}
			})
			.catch((err) => {
				debug(err);
				return err;
			});
	}
};
export default signupService;
