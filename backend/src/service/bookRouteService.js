import dbg from "debug";
const debug = dbg("service:bookRoute");
import checkToken from "../controllers/checkToken";
import generateRandomTrackId from "../controllers/generateRandomTrackId";
const bookRouteService = async (token, { path }) => {
	return await checkToken(token)
		.then((response) => {
			return generateRandomTrackId();
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default bookRouteService;
