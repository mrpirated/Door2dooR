import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addFlight");
import addFlightService from "../../service/adminServices/addFlightService";
router.post("/addFlight", async (req, res) => {
	await addFlightService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
