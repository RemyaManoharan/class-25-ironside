import { Request, Response } from "express";

export const getAdmin = (req: Request, res: Response) => {
  res.status(200).send({ message: "Successfully admin" });
};
