import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import logoImage from '../../assets/Logo Tumbnail.svg';
import styles from './ApplyForm.module.css';
import { TextField, InputLabel, TextareaAutosize } from '@mui/material';
import { useParams } from 'react-router-dom';
import useJobStore from '../../store/jobstore';
import JobApplicationSuccess from './JobApplicationSuccess';
import useAdminStore from '../../store/admin.store';
import { AuthContext } from '../../contexts/authContext';

type ApplyFormParams = {
  jobId: string;
};

function ApplyForm() {
  const { jobId } = useParams<ApplyFormParams>();
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const submitJobApplication = useJobStore((state) => state.submitJobApplication);
  const [error, setError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [jobDetails, setJobDetails] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    letter: '',
    user_id: '', // You need to implement a function to get the logged-in user ID
    job_id: jobId,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const { currentUser } = useContext(AuthContext);
  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);

  useEffect(() => {
    fetchCurrentUser(currentUser.uid);
  }, [currentUser, fetchCurrentUser]);

  const selectedJob = jobs.find((job) => job.job_id === Number(jobId));
  if (!selectedJob) {
    return <div>Job not found</div>;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'phoneNumber' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { phoneNumber, letter } = formData;

    // Check if required fields are empty
    if (!phoneNumber || !letter) {
      setError('Please fill out all required fields.');
      return;
    }
    const isUseId = user?.id;

    try {
      setError('');
      const contactNumber = formData.phoneNumber ? formData.phoneNumber.toString() : '';
      await submitJobApplication(Number(jobId), {
        name: formData.name,
        contact_number: contactNumber,
        application_letter: formData.letter,
        user_id: isUseId,
        job_id: jobId ? Number(jobId) : -1,
      });

      setSubmissionSuccess(true);
      setJobDetails(selectedJob);
    } catch (error) {
      console.error('Error submitting job application:', error);
      setError('Failed to add job application');
    }
  };

  return (
    <div className={styles.applyContainer}>
      <div className={styles.errorMsg}>
        {error && <Typography color='error'>{error}</Typography>}
      </div>
      {submissionSuccess ? (
        <JobApplicationSuccess jobDetails={jobDetails} />
      ) : (
        <>
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.nameContainer}>
                <InputLabel className={styles.inputLabel}>Name</InputLabel>
                <TextField
                  name='name'
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
                  label='Contact number'
                  type='number'
                  variant='outlined'
                  style={{ width: '512px' }}
                  className={styles.inputField}
                  InputProps={{ style: { background: '#F8F9FD', color: '#55555F' } }}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.letterContainer}>
                <InputLabel className={styles.inputLabel}>Application Letter</InputLabel>
                <TextareaAutosize
                  name='letter'
                  id='outlined-required'
                  aria-label='Application letter'
                  placeholder='Application letter'
                  minRows={5}
                  style={{ width: '512px', minHeight: '50px', background: '#F8F9FD' }}
                  className={styles.inputField}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.applyNowBtn}>
                <button type='submit' style={{ width: '512px' }}>
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default ApplyForm;
