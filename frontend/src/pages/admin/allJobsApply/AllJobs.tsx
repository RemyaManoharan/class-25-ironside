import React, { useState } from 'react';
import ApprovalCard from '../../../components/adminDetails/approvalCard/ApprovalCard';
import { useAdminData } from '../../../hooks/UseAdminData';
import style from './allJobs.module.css';
import { Link } from 'react-router-dom';

function AllJobsApply() {
  const { jobsRequest } = useAdminData();
  const [filter, setFilter] = useState('');
  const [sortName, setSortName] = useState(false);
  const [sortSalary, setSortSalary] = useState(false);
  const [sortLocation, setSortLocation] = useState(false);

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value);
    setSortName(false);
    setSortSalary(false);
    setSortLocation(false);
  };

  const handleNameClick = () => {
    setSortName(!sortName);
    setSortSalary(false);
    setSortLocation(false);
  };

  const handleSalaryClick = () => {
    setSortSalary(!sortSalary);
    setSortName(false);
    setSortLocation(false);
  };
  const handleLocationClick = () => {
    setSortLocation(!sortLocation);
    setSortName(false);
    setSortSalary(false);
  };

  const sortedJobs = [...jobsRequest].sort((a, b) => {
    if (sortName) {
      return a.name.localeCompare(b.name);
    } else if (sortSalary) {
      return parseInt(a.salary) - parseInt(b.salary);
    } else if (sortLocation) {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  const filteredJobs = sortedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(filter.toLowerCase()) ||
      job.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <div className={style.header}>
        <h1>All the jobs apply </h1>
        <Link to={'/admin'}>
          <p> Home </p>
        </Link>
      </div>
      <div className={style.filter}>
        <input
          type='text'
          placeholder='Filter by job title or company name'
          value={filter}
          onChange={handleFilterChange}
        />
        <div className={style.sorting}>
          <p>sort by</p>
          <button
            className={`${style.btn} ${sortName ? style.actice : ''}`}
            onClick={handleNameClick}
          >
            Name
          </button>
          <button
            className={`${style.btn} ${sortSalary ? style.actice : ''}`}
            onClick={handleSalaryClick}
          >
            Salary
          </button>
          <button
            className={`${style.btn} ${sortLocation ? style.actice : ''}`}
            onClick={handleLocationClick}
          >
            Location
          </button>
        </div>
      </div>
      <div className={style.content}>
        {filteredJobs.map((job, index) => {
          return (
            <div className={style.card} key={index}>
              {sortSalary ? <span className={style.salary}>{job.salary}</span> : ''}
              <ApprovalCard job={job} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllJobsApply;
