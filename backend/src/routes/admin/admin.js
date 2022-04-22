import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin");
import addStation from "./addStation";
import addTrain from "./addTrain";
router.use("/admin", addStation, addTrain);

export default router;
