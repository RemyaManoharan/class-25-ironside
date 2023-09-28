import express, { Router } from 'express';
import { getUserById, signupdb } from '../../controllers/user';

const userRoute: Router = express.Router();

userRoute.get('/:id', getUserById);
userRoute.post('/', signupdb);
export default userRoute;
