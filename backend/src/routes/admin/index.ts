import express, { Router } from 'express';
import {
  getJobRequests,
  getUserCount,
  getCompanyCount,
  getJobsCount,
  getOpenJobsCount,
  deleteJob,
  addJob,
  deleteCompany,
  addCompany,
  getCompaniesRequests,
} from '../../controllers/admin';

const adminRoute: Router = express.Router();

adminRoute.get('/', getJobRequests);
adminRoute.get('/users', getUserCount);
adminRoute.get('/company', getCompanyCount);
adminRoute.get('/jobs', getJobsCount);
adminRoute.get('/jobs/open', getOpenJobsCount);
adminRoute.delete('/jobs/:id', deleteJob);
adminRoute.put('/jobs/:id', addJob);
adminRoute.get('/companies', getCompaniesRequests);
adminRoute.delete('/company/:id', deleteCompany);
adminRoute.put('/company/:id', addCompany);

export default adminRoute;
