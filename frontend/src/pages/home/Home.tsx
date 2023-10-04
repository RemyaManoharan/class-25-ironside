import React, { useEffect, useContext } from 'react';
import JobList from '../../components/JobList/JobList';
import './Home.css';
import { Typography } from '@mui/material';
import FilterForm from '../../components/FilterForm/FilterForm';
import useAdminStore from '../../store/admin.store';
import { AuthContext } from '../../contexts/authContext';
import AdminPage from '../admin/AdminPage';

function Home() {
  const { currentUser } = useContext(AuthContext);
  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);

  useEffect(() => {
    fetchCurrentUser(currentUser.uid);
  }, []);
  const isUserAdmin = user?.user_type === 'admin';

  return isUserAdmin ? (
    <AdminPage />
  ) : (
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
              Recommended Jobs
            </Typography>
          </div>
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default Home;
