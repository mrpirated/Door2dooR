import dbg from "debug";
const debug = dbg("controller:twilioOTP");
import config from "../config";
const client = require("twilio")(
	config.TWILIO_ACCOUNT_SID,
	config.TWILIO_AUTH_TOKEN
);
const twilioOTP = async (user) => {
	debug(user);
	if (user.otp == undefined) {
		return client.verify
			.services(config.TWILIO_SERVICE_ID)
			.verifications.create({ to: user.phone, channel: "sms" })
			.then((data) => {
				//debug(data);
				return Promise.resolve({
					success: true,
					message: "SMS sent successfully",
					data,
				});
			})
			.catch((err) => {
				debug(err);
				Promise.reject({ success: false, message: err });
			});
	} else {
		return client.verify
			.services(config.TWILIO_SERVICE_ID)
			.verificationChecks.create({ to: user.phone, code: user.otp })
			.then((data) => {
				return Promise.resolve(data.status);
			})
			.catch((err) => {
				debug(err);
				Promise.reject({ success: false, message: err });
			});
	}
};
export default twilioOTP;
