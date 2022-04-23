import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:findFastestRoute");
import findFastestRouteService from "../service/findFastestRouteService";
router.get("/findFastestRoute", async (req, res) => {
	await findFastestRouteService(req.headers.authorization, req.query)
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
