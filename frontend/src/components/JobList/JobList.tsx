import React, { useEffect } from 'react';
import JobCard from '../JobCard/JobCard';
import './JobList.css';
import useJobStore from '../../store/jobstore';

const JobList: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  useEffect(() => {
    // will be replacing the accessToken when code is ready
    const accessToken = '';
    fetchJobs(accessToken).catch((error) => {
      console.error('Error fetching jobs:', error);
    });
  }, [fetchJobs]);

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
