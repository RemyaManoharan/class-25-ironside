import React, { useState } from 'react';
import JobList from '../../components/JobList/JobList';
import './Home.css';
import { Typography } from '@mui/material';
import FilterForm from '../../components/FilterForm/FilterForm';
import { BsFilterSquare } from 'react-icons/bs';

function Home() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <div className='home-container'>
      <div className='home-content '>
        <div className={`filter-section sub-head`}>
          <div className='filter-header'>
            <Typography variant='h3' component='h2'>
              Filter
            </Typography>
          </div>

          <div className={`home-filter ${showFilter ? 'home-show' : ''}`}>
            <FilterForm toggleFilter={toggleFilter} />
          </div>
        </div>

        <div className='job-wrapper'>
          <div className='result sub-head'>
            <div className='filter-btn-container'>
              <div className='recom-job-head'>
                <Typography variant='h3' component='h2'>
                  Recomended Jobs
                </Typography>
              </div>
              <div className='filter-bttn'>
                <button className='toggleFilterBtn' onClick={toggleFilter}>
                  <BsFilterSquare />
                </button>
                Filter
              </div>
            </div>
          </div>
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default Home;
