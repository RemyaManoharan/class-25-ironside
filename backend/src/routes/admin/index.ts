import express, { Router } from 'express';
import {
  getJobRequests,
  getUserCount,
  getCompanyCount,
  getJobsCount,
  getOpenJobsCount,
  deleteJob,
  addJob,
} from '../../controllers/admin';

const adminRoute: Router = express.Router();

adminRoute.get('/', getJobRequests);
adminRoute.get('/users', getUserCount);
adminRoute.get('/company', getCompanyCount);
adminRoute.get('/jobs', getJobsCount);
adminRoute.get('/jobs/open', getOpenJobsCount);
adminRoute.delete('/jobs/:id', deleteJob);
adminRoute.put('/jobs/:id', addJob);

export default adminRoute;
