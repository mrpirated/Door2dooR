import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:trackRoute");
import trackRouteService from "../service/trackRouteService";
router.get("/trackRoute", async (req, res) => {
	await trackRouteService(req.headers.authorization, req.query)
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
