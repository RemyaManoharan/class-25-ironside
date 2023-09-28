import express, { Router } from "express";
import { getAllJobs, getJobById, getJobsByLocation,getJobsByWorkTypes,getJobsByExperience } from "../../controllers/jobs";

const jobRoute: Router = express.Router();

// Route to filter by location
jobRoute.get("/filter/:location", getJobsByLocation);


// Route to filter by work type
jobRoute.get("/worktype", getJobsByWorkTypes);

// Route to filter by experience
jobRoute.get("/experience/:experience", getJobsByExperience);

// Route to get by id
jobRoute.get("/:id", getJobById);

// Route to get all jobs
jobRoute.get("/", getAllJobs);



export default jobRoute;
