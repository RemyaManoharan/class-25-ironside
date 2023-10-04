import React from 'react';
import style from './jobApproval.module.css';
import ApprovalCard from '../approvalCard/ApprovalCard';

interface JobsProps {
  jobs: any[];
}

const JobApproval: React.FC<JobsProps> = ({ jobs }) => {
  const jobsToApprove = jobs.slice(0, 4);

  return (
    <section className={style.content}>
      <div className={style.title}>
        <h3>need to approve</h3>
        <p>see all</p>
      </div>
      <div className={style.cardContent}>
        {jobsToApprove.map((job, index) => (
          <ApprovalCard key={index} job={job} />
        ))}
      </div>
    </section>
  );
};

export default JobApproval;
