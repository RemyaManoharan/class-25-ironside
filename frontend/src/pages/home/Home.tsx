import React from "react";
import JobList from "../../components/JobList/JobList";
import "./Home.css";
import { Typography } from "@mui/material";
import JobDetail from "../../components/JobDetail/JobDetail";

const jobs = [
  {
    job_id: 1,
    job_title: "3D Illustrator",
    company_name: "Omnicreative",
    description: "We are looking for top illustrators proficient in Cinema 4D",
    location: "Singapore",
  },
  {
    job_id: 2,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 3,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description:
      "We are looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 4,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 5,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 6,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 7,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 8,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 9,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
  {
    job_id: 10,
    job_title: "Motion Graphic",
    company_name: "Meta Studio",
    description: "looking for top motion graphic proficient in After Effects",
    location: "Singapore",
  },
];


function Home() {
  return (
    <div className="home-container">
      <div>this is Home</div>

      <div className="home-content ">
        <div className="filter-section sub-head">
          <Typography variant="h3" component="h2">
            Filter
          </Typography>
        </div>

        <div className="job-wrapper">
          <div className="result sub-head">
            <Typography variant="h3" component="h2">
              Recomended Jobs
            </Typography>
          </div>
          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
}

export default Home;
