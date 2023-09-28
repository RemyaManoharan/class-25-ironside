import React from 'react';
import JobCard from '../JobCard/JobCard';
import "./JobList.css";

// interface for jobs
interface Job {
  job_id: number;
  job_title : string;
  company_name : string;
  description:string;
  location : string;
}
interface JobListProps {
  jobs: Job[] ;
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <section>
    <div className='job-container'>
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
    </section>
  );
};

export default JobList;
