import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin/addTrain");
import addTrainService from "../../service/adminServices/addTrainService";
router.post("/addTrain", async (req, res) => {
	await addTrainService(req.headers.authorization, req.body)
		.then((response) => {
			res.send(response);
		})
		.catch((err) => {
			debug(err);
			res.status(500).send({ message: err.msg });
		});
});
export default router;
