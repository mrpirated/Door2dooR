import jwt from "jsonwebtoken";
import config from "../config";
const getToken = (payload, expiresIn) => {
	return jwt.sign(payload, config.SECRET_KEY, { expiresIn: expiresIn });
};
export default getToken;
