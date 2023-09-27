import { Request, Response } from 'express';
import { adminFireAuth } from '../../firebase/config';
import db from '../../config/db-config';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    const user = await adminFireAuth.getUser(uid);
    const getUser = await db('users').where('uid', uid);

    res.status(200).send({ getUser });
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
