import React from 'react';
import JobList from '../../components/JobList/JobList';
import './Home.css';
import { Typography } from '@mui/material';
import JobDetail from '../../components/JobDetail/JobDetail';
import FilterForm from '../../components/FilterForm/FilterForm';

function Home() {
  return (
    <div className='home-container'>
      <div>this is Home</div>

      <div className='home-content '>
        <div className='filter-section sub-head'>
          <Typography variant='h3' component='h2'>
            Filter
          </Typography>
          <FilterForm />
        </div>

        <div className='job-wrapper'>
          <div className='result sub-head'>
            <Typography variant='h3' component='h2'>
              Recomended Jobs
            </Typography>
          </div>
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default Home;
