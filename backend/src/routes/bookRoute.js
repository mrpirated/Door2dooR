import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:bookRoute");
import bookRouteService from "../service/bookRouteService";
router.post("/bookRoute", async (req, res) => {
	await bookRouteService(req.headers.authorization, req.body)
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
