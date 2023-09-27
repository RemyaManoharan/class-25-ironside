import express, { Router } from "express";
import jobRoute from "./jobs";
import userRoute from "./user";
import { validateAuth } from "../helpers/auth";

const router: Router = express.Router();

// Route that is protected by auth validation
router.use("/jobs", validateAuth, jobRoute);
// Route that is protected by auth validation

router.use("/user", validateAuth, userRoute);

export default router;
