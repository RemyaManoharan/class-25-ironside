import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import logoImage from '../../assets/Logo Tumbnail.svg';
import styles from './ApplyForm.module.css';
import { TextField, InputLabel } from '@mui/material';
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
    user_id: '',
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
      {submissionSuccess ? (
        <JobApplicationSuccess jobDetails={jobDetails} />
      ) : (
        <div className={styles.formContent}>
          <div className={styles.formHeader}>
            <div>
              <h3 className={styles.formTitle}> Apply Form</h3>
            </div>
            <div className={styles.logoWrapper}>
              <img src={logoImage} alt='logo-company' />
              <div className={styles.companyJob}>
                {selectedJob && (
                  <>
                    <h1 className={styles.companyHeader}> {selectedJob.title}</h1>

                    <div className={styles.jobType}>
                      <Typography variant='h4' component='h2'>
                        {selectedJob.name}
                      </Typography>
                      <span className={styles.dote}>•</span>
                      <Typography variant='h4' component='h2'>
                        {selectedJob.is_remotework ? 'Remote' : 'In-Office'}
                      </Typography>
                      <span className={styles.dote}>•</span>
                      <Typography variant='h4' component='h2'>
                        {selectedJob.job_type}
                      </Typography>
                      <span className={styles.dote}>•</span>
                      <Typography variant='h4' component='h2'>
                        {selectedJob.experience} years experience
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.fillform}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.errorMsg}>
                {error && (
                  <Typography color='error' className={styles.errorMsg}>
                    {error}
                  </Typography>
                )}
              </div>
              <div className={styles.inputs}>
                <InputLabel className={styles.label}>Name</InputLabel>
                <TextField
                  name='name'
                  id='outlined-required'
                  type='text'
                  variant='outlined'
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  placeholder='Full Name'
                />
              </div>
              <div className={styles.inputs}>
                <InputLabel className={styles.label}>Contact</InputLabel>
                <TextField
                  name='phoneNumber'
                  id='outlined-required'
                  type='number'
                  variant='outlined'
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  onChange={handleChange}
                  placeholder='Phone Number'
                />
              </div>
              <div className={styles.textAreaContaier}>
                <InputLabel className={styles.label}>Application Letter</InputLabel>
                <textarea
                  name='letter'
                  id='outlined-required'
                  aria-label='Application letter'
                  placeholder='Input Text Here'
                  onChange={handleChange}
                  className={styles.textArea}
                />
              </div>

              <button type='submit' className={styles.applyNowBtn}>
                Apply Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplyForm;
