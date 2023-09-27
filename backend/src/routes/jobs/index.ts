import express, { Router } from 'express';
import { getAllJobs } from '../../controllers/jobs';

const jobRoute: Router = express.Router();

jobRoute.get('/', getAllJobs);

export default jobRoute;
