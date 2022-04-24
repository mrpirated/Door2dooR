import dbg from "debug";
const debug = dbg("service:trackRoute");
import checkToken from "../controllers/checkToken";
import trackRoute from "../data/trackRoute";
const trackRouteService = async (token, { track_id }) => {
	return await checkToken(token)
		.then((response) => {
			return trackRoute(track_id);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default trackRouteService;
