import dbg from "debug";
const debug = dbg("service:login");
import checkToken from "../controllers/checkToken";
import getHotspots from "../controllers/getHotspots";
const findFastestRouteService = async (
	token,
	{ src_pincode, dest_pincode }
) => {
	return await checkToken(token)
		.then((response) => {
			return getHotspots();
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default findFastestRouteService;
