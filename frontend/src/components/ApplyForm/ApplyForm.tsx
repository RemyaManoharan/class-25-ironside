import React from 'react';
import { Typography } from '@mui/material';
import logoImage from '../../assets/Logo Tumbnail.svg';
import styles from './ApplyForm.module.css';
import { TextField, InputLabel } from '@mui/material';

function Filter() {
  return (
    <div className={styles.applyContainer}>
      <Typography variant='h3' component='h2'>
        Apply Form
      </Typography>
      <div className={styles.jobHeader}>
        <div className='logo-wrapper'>
          <img src={logoImage} alt='logo-company' />
          <div className={styles.companyJob}>
            <Typography variant='h2' component='h2'>
              UI/UX Designer
            </Typography>
            <div className={styles.jobType}>
              <Typography variant='h4' component='h2'>
                UI/UX Designer
              </Typography>
              <Typography variant='h4' component='h2'>
                Remote
              </Typography>
              <Typography variant='h4' component='h2'>
                Full-time
              </Typography>
              <Typography variant='h4' component='h2'>
                1-3 years Experirnce
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* form container */}
      <div className={styles.formContainer}>
        <form>
          <div className={styles.nameContainer}>
            <InputLabel className='label'>Name</InputLabel>
            <TextField
              name='Name'
              id='outlined-required'
              label='Name'
              type='text'
              variant='outlined'
              required
              InputProps={{ style: { background: '#F8F9FD' } }}
            />
          </div>
          <div className={styles.contactContainer}>
            <InputLabel className='label'>Contact</InputLabel>
            <TextField
              name='phoneNumber'
              id='outlined-required'
              label='telephone number'
              type='number'
              variant='outlined'
              required
              InputProps={{ style: { background: '#F8F9FD' } }}
            />
          </div>
          <div className={styles.letterContainer}>
            <InputLabel className='label'>Application Letter</InputLabel>
            <TextField
              name='letter'
              id='outlined-required'
              label='Name'
              type='text'
              variant='outlined'
              required
              InputProps={{ style: { background: '#F8F9FD' } }}
            />
          </div>
          <div className={styles.applyNowBtn}></div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
