import express, { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByLocation,
  getJobsByWorkTypes,
  getJobsByExperience,
  getFilteredJobs,
  getAllJobDetails,
} from '../../controllers/jobs';
const jobRoute: Router = express.Router();
// Route to get all job details with company details
jobRoute.get('/all', getAllJobDetails);
// Route to filter jobs based on multiple criteria
jobRoute.get('/', getFilteredJobs);
// Route to filter by location
jobRoute.get('/location', getJobsByLocation);
// Route to filter by work type
jobRoute.get('/workTypes', getJobsByWorkTypes);
// Route to filter by experience
jobRoute.get('/experience', getJobsByExperience);
// Route to get by id
jobRoute.get('/:id', getJobById);
// Route to get all jobs
jobRoute.get('/', getAllJobs);
export default jobRoute;
