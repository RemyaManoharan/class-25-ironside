import express, { Router } from "express";
import { getAdmin } from "../../controllers/admin";

const adminRoute: Router = express.Router();

adminRoute.get("/", getAdmin);

export default adminRoute;
