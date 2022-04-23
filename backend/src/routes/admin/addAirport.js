import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addAirport");
import addAirportService from "../../service/adminServices/addAirportService";
router.post("/addAirport", async (req, res) => {
	await addAirportService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
