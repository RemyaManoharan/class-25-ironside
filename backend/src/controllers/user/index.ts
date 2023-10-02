import { Request, Response } from 'express';
import db from '../../config/db-config';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    const getUser = await db('users').where('uid', uid).first();

    res.status(200).json(getUser);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    res.status(400).json({ errorCode, errorMessage });
  }
};

export const addUserdb = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    await db('users').insert(user);
    res.status(200).send({ message: 'User registered' });
  } catch (err) {
    res.status(400).json(err);
  }
};
