import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import logoImage from '../../assets/Logo Tumbnail.svg';
import styles from './ApplyForm.module.css';
import { TextField, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import useJobStore from '../../store/jobstore';

type ApplyFormParams = {
  jobId: string;
};

function ApplyForm() {
  const { jobId } = useParams<ApplyFormParams>();
  // const { jobId } = useParams<{ jobId: string }>();
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  useEffect(() => {
    fetchJobs();
  }, []);
  const selectedJob = jobs.find((job) => job.id === Number(jobId));

  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  return (
    <div className={styles.applyContainer}>
      <Typography variant='h3' component='h2' className={styles.formTitle}>
        Apply Form
      </Typography>

      <div className={styles.jobHeader}>
        <div className='logo-wrapper'>
          <img src={logoImage} alt='logo-company' />
          <div className={styles.companyJob}>
            {selectedJob && (
              <>
                <Typography variant='h2' component='h2'>
                  {selectedJob.title}
                </Typography>
                <div className='jobType'>
                  <Typography variant='h4' component='h2'>
                    {selectedJob.name}
                  </Typography>
                  <Typography variant='h4' component='h2'>
                    {selectedJob.is_remotework ? 'Remote' : 'In-Office'}
                  </Typography>
                  <Typography variant='h4' component='h2'>
                    {selectedJob.job_type}
                  </Typography>

                  <Typography variant='h4' component='h2'>
                    {selectedJob.experience} years experience
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* form container */}
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.nameContainer}>
            <InputLabel className={styles.inputLabel}>Name</InputLabel>
            <TextField
              name='Name'
              id='outlined-required'
              label='Full Name'
              type='text'
              variant='outlined'
              style={{ width: '512px' }}
              className={styles.inputField}
              InputProps={{ style: { background: '#F8F9FD' } }}
            />
          </div>
          <div className={styles.contactContainer}>
            <InputLabel className={styles.inputLabel}>Contact</InputLabel>
            <TextField
              name='phoneNumber'
              id='outlined-required'
              label='telephone number'
              type='number'
              variant='outlined'
              style={{ width: '512px' }}
              className={styles.inputField}
              InputProps={{ style: { background: '#F8F9FD', color: '#55555F' } }}
            />
          </div>
          <div className={styles.letterContainer}>
            <InputLabel className={styles.inputLabel}>Application Letter</InputLabel>
            <TextField
              name='letter'
              id='outlined-required'
              label='Application letter'
              type='text'
              variant='outlined'
              className={styles.inputField}
              InputProps={{ style: { background: '#F8F9FD' } }}
            />
          </div>
          <div className={styles.applyNowBtn}>
            <button type='submit' style={{ width: '512px' }}>
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;
