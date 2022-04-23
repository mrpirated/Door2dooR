import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin");
import addStation from "./addStation";
import addTrain from "./addTrain";
import addAirport from "./addAirport";
import addFlight from "./addFlight";
router.use("/admin", addStation, addTrain, addAirport, addFlight);

export default router;
