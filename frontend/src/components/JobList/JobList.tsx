import React, { useEffect } from 'react';
import JobCard from '../JobCard/JobCard';
import './JobList.css';
import useJobStore from '../../store/jobstore';

const JobList: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const filters = useJobStore((state) => state.filters);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

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
