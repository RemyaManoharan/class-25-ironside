import express, { Router } from 'express';
import jobRoute from './jobs';
import userRoute from './user';
import adminRoute from './admin';
import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/jobs', validateAuth, jobRoute);

router.use('/user', validateAuth, userRoute);

router.use('/admin', validateAuth, adminRoute);

export default router;
