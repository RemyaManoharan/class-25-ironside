import React, { useState } from 'react';
import JobList from '../../components/JobList/JobList';
import './Home.css';
import { Typography } from '@mui/material';
import FilterForm from '../../components/FilterForm/FilterForm';
import { BsFilterSquare } from 'react-icons/bs';

function Home() {
  const [showFilter, setShowFilter] = useState(true);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className='home-container'>
      <div>this is Home</div>
      <div className='home-content '>
        <div className={`filter-section sub-head ${showFilter ? 'show' : ''}`}>
          <div className='filter-header'>
            <div className='filter-heading'>
              <Typography variant='h3' component='h2'>
                Filter
              </Typography>
              <button className='toggleFilter' onClick={toggleFilter}>
                <BsFilterSquare />
                Filter
              </button>
            </div>
          </div>
          {showFilter && <FilterForm />}
        </div>

        <div className='job-wrapper'>
          <div className='result sub-head'>
            <div className='filter-btn-container'>
              <Typography variant='h3' component='h2'>
                Recomended Jobs
              </Typography>

              <button className='toggleFilter' onClick={toggleFilter}>
                <BsFilterSquare />
                Filter
              </button>
            </div>
          </div>
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default Home;
