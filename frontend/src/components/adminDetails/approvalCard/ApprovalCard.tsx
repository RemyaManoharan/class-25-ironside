import React, { useState } from 'react';
import CompanyLogo from '../../../assets/Logo Tumbnail.svg';
import locationSvg from '../assets/Location.svg';
import style from './approvalCard.module.css';
import useAdminStore from '../../../store/admin.store';

interface Job {
  id: number;
  title: string;
  description: string;
  name: string;
  location: string;
}

interface ApprovalCardProps {
  job: Job;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ job }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const deleteJobRequest = useAdminStore((state) => state.deleteJobRequest);
  const addJobRequest = useAdminStore((state) => state.addJobRequest);

  const handleDenyClick = async (id: number) => {
    setIsClicked(true);
    deleteJobRequest(id);
  };
  const handleApproveClick = async (id: number) => {
    setIsClicked(true);
    addJobRequest(id);
  };

  return (
    <div className={`${style.cardContainer} ${isClicked ? style.fadeOut : ''}`}>
      <div className={style.logoTitle}>
        <div className={style.logo}>
          <img src={CompanyLogo} alt='companylogo' />
        </div>
        <div className={style.title}>
          <div>{job.title}</div>
          <div>{job.name}</div>
        </div>
      </div>
      <div className={style.buttons}>
        <button className={style.btn} onClick={() => handleDenyClick(job.id)}>
          Deny
        </button>
        <button
          className={`${style.btn} ${style.approve}`}
          onClick={() => handleApproveClick(job.id)}
        >
          Approve
        </button>
      </div>
      <div className={style.description}>{job.description}</div>
      <div className={style.location}>
        <img src={locationSvg} alt='locationSvg' /> {job.location}
      </div>
    </div>
  );
};

export default ApprovalCard;
