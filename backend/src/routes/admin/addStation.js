import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addStation");
import addStationService from "../../service/adminServices/addStationService";
router.post("/addStation", async (req, res) => {
	await addStationService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
