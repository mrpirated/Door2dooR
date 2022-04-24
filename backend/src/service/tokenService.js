import checkToken from "../controllers/checkToken";
import dbg from "debug";
import getUser from "../data/getUser";
const debug = dbg("service:token");

const tokenService = async (token) => {
	return await checkToken(token)
		.then((response) => {
			//debug(response);
			if (response.success) {
				return Promise.resolve(response.data.decoded);
			} else {
				return Promise.reject(response);
			}
		})
		.then((decoded) => {
			debug(decoded);
			return getUser(decoded);
		})
		.catch((err) => {
			debug(err);
			return err;
		});
};
export default tokenService;
