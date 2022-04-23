import dbg from "debug";
const debug = dbg("service:admin/addAirport");
import checkAirportExists from "../../data/checkAirportExists";
import checkToken from "../../controllers/checkToken";
import addAirport from "../../data/addAirport";
const addAirportService = async (token, { code, name, pincode }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return checkAirportExists(code);
		})
		.then((response) => {
			if (response.success) {
				return addAirport(code, name, pincode);
			} else {
				return Promise.reject({ success: false, message: response.message });
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addAirportService;
