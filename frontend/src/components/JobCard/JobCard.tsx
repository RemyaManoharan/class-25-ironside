// JobCard.tsx
import React from "react";
import "./JobCard.css";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import CompanyLogo from "../../assets/Logo Tumbnail.svg";
import { Link } from "react-router-dom";

interface Job {
  job_id: number;
  job_title: string;
  company_name: string;
  description: string;
  location: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <div className="card-head">
        <div className="logo">
          <img src={CompanyLogo} alt="companylogo" />
        </div>

        <div className="card-title">
          <Link to={`/jobdetails/${job.job_id}`} className="customLink">
            <h2 className="title-job">{job.job_title}</h2>
          </Link>
          <p className="com-name">{job.company_name}</p>
        </div>
      </div>

      <div className="job-descp">
        <p>{job.description}</p>
      </div>

      <div className="card-footer">
        <p>
          <BsPeople /> 00
        </p>
        <p>
          {" "}
          <CiLocationOn /> {job.location}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
