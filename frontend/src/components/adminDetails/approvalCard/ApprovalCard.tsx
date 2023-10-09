import React, { useState } from 'react';
import CompanyLogo from '../../../assets/Logo Tumbnail.svg';
import locationSvg from '../assets/Location.svg';
import style from './approvalCard.module.css';
import useAdminStore from '../../../store/admin.store';
import { AdminPropsType } from '../types/types';
import { useEffect } from 'react';

const ApprovalCard: React.FC<AdminPropsType> = ({ job }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const deleteJobRequest = useAdminStore((state) => state.deleteJobRequest);
  const addJobRequest = useAdminStore((state) => state.addJobRequest);

  const handleDenyClick = async (id: number) => {
    setIsClicked(true);
    setTimeout(() => {
      deleteJobRequest(id);
    }, 300);
  };
  const handleApproveClick = async (id: number) => {
    setIsClicked(true);
    setTimeout(() => {
      addJobRequest(id);
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  }, [job]);
  return (
    <div className={`${style.cardContainer} ${isClicked ? style.fadeOut : ''}`}>
      <div className={style.logoTitle}>
        <div className={style.logo}>
          <img src={CompanyLogo} alt='companylogo' />
        </div>
        <div className={style.title}>
          <div>{job.title}</div>
          <div className={style.name}>{job.name}</div>
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
          Aprove
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
