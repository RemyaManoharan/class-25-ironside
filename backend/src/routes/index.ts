import express, { Router } from 'express';
import jobRoute from './jobs';
import userRoute from './user';
import adminRoute from './admin';
import companyRoute from './company';
import insertJobRoute from './company/job';

import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/company', companyRoute);

router.use('/company/addjob', insertJobRoute);

router.use('/jobs', validateAuth, jobRoute);

router.use('/user', validateAuth, userRoute);

router.use('/admin', validateAuth, adminRoute);

export default router;
