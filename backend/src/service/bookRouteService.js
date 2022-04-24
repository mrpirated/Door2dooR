import dbg from "debug";
const debug = dbg("service:bookRoute");
import checkToken from "../controllers/checkToken";
import addNewTrack from "../data/addNewTrack";
const bookRouteService = async (token, { path }) => {
	return await checkToken(token)
		.then((response) => {
			return addNewTrack(path, response.data.decoded.user_id);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};

export default bookRouteService;
