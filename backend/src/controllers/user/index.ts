import { Request, Response } from "express";
import { adminFireAuth } from "../../firebase/config";
interface CustomRequest extends Request {
  user: {
    uid: string;
  };
}

export const getUserById = async (req: CustomRequest, res: Response) => {
  try {
    const uid = req["user"]["uid"];
    const user = await adminFireAuth.getUser(uid);
    res.status(200).send({ user });
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(400).json({ errorCode, errorMessage });
  }
};
