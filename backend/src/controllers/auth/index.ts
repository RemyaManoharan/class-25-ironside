import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import db from "../../config/db-config";

const signUp = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    await check("email", "Invalid Email").isEmail().run(req);
    await check("password", "Password must be at least 8 characters long")
      .isLength({
        min: 8,
      })
      .run(req);
    await check("password", "Password must contain special character")
      .matches(/[$*.{}()?"!@#%&/,><':;|_~`]/)
      .run(req);
    await check("password", "Password must contain a number")
      .matches(/[0-9]/)
      .run(req);
    await check("password", "Password must contain a lower case letter")
      .matches(/[a-z]/)
      .run(req);
    await check("password", "Password must contain an upper case letter")
      .matches(/[A-Z]/)
      .run(req);
    await check("first_name", "First Name is required").notEmpty().run(req);
    await check("last_name", "Last Name is required").notEmpty().run(req);
    const Result = validationResult(req);

    console.error("Result.errors:", Result);

    if (!Result.isEmpty()) {
      return res.status(401).send(Result.array());
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(200).send({ message: "logged" });
};

const testAuth = (req: Request, res: Response) => {
  res.status(200).send({ message: "Test auth route works successfully!!!!" });
};

export default { signUp, login, testAuth };
