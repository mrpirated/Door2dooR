import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:signup");
import signupService from "../service/signupService";
router.post("/signup", async (req, res) => {
	await signupService(req.body)
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
