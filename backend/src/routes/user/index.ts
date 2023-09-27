import express, { Router } from 'express';
import { getUserById, addUserdb } from '../../controllers/user';

const userRoute: Router = express.Router();

userRoute.get('/:id', getUserById);
userRoute.post('/', addUserdb);
export default userRoute;
