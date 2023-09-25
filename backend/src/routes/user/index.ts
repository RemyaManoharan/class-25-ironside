import express, { Router } from "express";
import { getUserById } from "../../controllers/user";

const userRoute: Router = express.Router();

userRoute.get("/:id", getUserById);

export default userRoute;
