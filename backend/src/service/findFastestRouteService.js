import dbg from "debug";
const debug = dbg("service:findFastestRoute");
import checkToken from "../controllers/checkToken";
import getHotspots from "../controllers/getHotspots";
import findFastestRoute from "../controllers/findFastestRoute";
const findFastestRouteService = async (
	token,
	{ src_pincode, dest_pincode }
) => {
	var hotspots;
	return await checkToken(token)
		.then((response) => {
			return getHotspots();
		})
		.then((response) => {
			hotspots = response.data.hotspots;
			return findFastestRoute(src_pincode, dest_pincode, hotspots);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default findFastestRouteService;
