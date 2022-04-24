import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:signup");
import tokenService from "../service/tokenService";
router.get("/token", async (req, res) => {
	await tokenService(req.headers.authorization)
		.then((response) => {
			debug(response);
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ success: false, message: err });
		});
});
export default router;
