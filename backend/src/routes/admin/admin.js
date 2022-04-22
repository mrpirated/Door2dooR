import { Router } from "express";
const router = Router();
import dbg from "debug";
const debug = dbg("api:admin");
import addStation from "./addStation";
router.use("/admin", addStation);

export default router;
