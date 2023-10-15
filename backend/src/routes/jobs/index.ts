import express, { Router } from 'express';
import {
  getJobById,
  getJobsByLocation,
  getJobsByWorkTypes,
  getJobsByExperience,
  getFilteredJobs,
  getAllJobDetails,
  postJobApplication,
  getTotalJobApplicants,
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
// Route to post job into database
jobRoute.post('/job-applications', postJobApplication);
// Route to get total applicants
jobRoute.get('/:jobId/count', getTotalJobApplicants);

export default jobRoute;
