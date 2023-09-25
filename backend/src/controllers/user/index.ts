import { Request, Response } from "express";
import { adminFireAuth } from "../../firebase/config";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    const user = await adminFireAuth.getUser(uid);
    res.status(200).send({ user });
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(400).json({ errorCode, errorMessage });
  }
};
