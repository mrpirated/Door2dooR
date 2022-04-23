import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin");
import addStation from "./addStation";
import addTrain from "./addTrain";
import addAirport from "./addAirport";
router.use("/admin", addStation, addTrain, addAirport);

export default router;
