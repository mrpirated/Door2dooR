import dbg from "debug";
const debug = dbg("service:admin/addStation");
import checkStationExists from "../../data/checkStationExists";
import checkToken from "../../controllers/checkToken";
import addStation from "../../data/addStation";
const addStationService = async (token, { code, name, pincode }) => {
	return await checkToken(token)
		.then((response) => {
			if (response.data.decoded.type !== "admin") {
				return Promise.reject({ success: false, message: "Not Authorized" });
			}
			return checkStationExists(code);
		})
		.then((response) => {
			if (response.success) {
				return addStation(code, name, pincode);
			} else {
				return Promise.reject({ success: false, message: response.message });
			}
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default addStationService;
