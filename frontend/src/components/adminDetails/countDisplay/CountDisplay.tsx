import React from 'react';
import style from './count.module.css';
import allJobs from '../assets/allJobs.svg';
import companies from '../assets/companies.svg';
import openJobs from '../assets/openJobs.svg';
import users from '../assets/users.svg';
import { CountDisplayProps } from '../types/types';

const CountDisplay: React.FC<CountDisplayProps> = ({
  openJobsCount,
  jobsCount,
  companiesCount,
  usersCount,
}) => {
  return (
    <div className={style.countContainer}>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={allJobs} alt='allJobs' />
        </div>
        <div className={style.info}>
          <h4>All Jobs</h4>
          <p>{jobsCount}</p>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={companies} alt='companies' />
        </div>
        <div className={style.info}>
          <h4>Company</h4>
          <p>{companiesCount}</p>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={openJobs} alt='openJobs' />
        </div>
        <div className={style.info}>
          <h4>Open Jobs</h4>
          <p>{openJobsCount}</p>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={users} alt='users' />
        </div>
        <div className={style.info}>
          <h4>Users</h4>
          <p>{usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default CountDisplay;
