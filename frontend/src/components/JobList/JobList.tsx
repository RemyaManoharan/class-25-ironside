import React, { useEffect } from 'react';
import JobCard from '../JobCard/JobCard';
import './JobList.css';
import useJobStore from '../../store/jobstore';

const JobList: React.FC = () => {
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  useEffect(() => {
    // will be replacing the accessToken when code is ready
    const accessToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSXJvbiBzaWRlIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2lyb24tc2lkZS1mNTA4MiIsImF1ZCI6Imlyb24tc2lkZS1mNTA4MiIsImF1dGhfdGltZSI6MTY5NjA5NjI2MSwidXNlcl9pZCI6IldxcENIc0ZkUGRSclVRd3o1Zk41UHB5N09FMjIiLCJzdWIiOiJXcXBDSHNGZFBkUnJVUXd6NWZONVBweTdPRTIyIiwiaWF0IjoxNjk2MTU0NDU5LCJleHAiOjE2OTYxNTgwNTksImVtYWlsIjoiaXJvbnNpZGU0NTU0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJpcm9uc2lkZTQ1NTRAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Cqk2UdyS5II7dzf5HUIGP_fuB0uPeECtqf9uK-8mvvQMfNwz3mW5ai9xFSL6YvK64ipOxamYmhMgvy_-gIbc16uUvq0LpXSqCHFI-tEQIM4zQN6MBJarv81JVj8KMAjaixk7mfE3mznOmLLS0qDuNX13GKNu1akMTa31n0uZQ5LD9jAy65iBXvUttce5IJZerPUFu8NAxx28LGicUNG6f9cKjJFl09VgWRc8SfLOVxpX3kHfFj9E9ELKXuGJEKH_54jBKZuuTAMDJcF1FxXzEd12xBj3BSVctFn6-v84cFCub0RpBE86y6wF3coB5t6bTtcog5TNyDW6akgIxesyGg';
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
