import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, InputLabel } from '@mui/material';
import Password from '../../assets/password.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import Icon from '../../assets/aperture.svg';
import './Reset.css';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState<string>('');

  const [isLinkSent, setIsLinkSent] = useState(false);
  const isButtonDisabled = !email || loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call the resetPassword function
      await resetPassword(email);
      setIsLinkSent(true);
    } catch (error) {
      console.error('Error during reset:', error);
      setError(error as string);
    }
    setLoading(false);
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <Typography component='p' variant='h5'>
          <img className='Icon' src={Icon} alt='Icon' /> Dashboard
        </Typography>
      </div>
      <div className='main-content'>
        <div className='form-content'>
          {isLinkSent ? (
            <div className='form-design'>
              <Link to='/login'>
                <img className='ArrowRight' src={ArrowRight} alt='ArrowRight' />
              </Link>
              <Typography variant='subtitle2' className='forget-password'>
                Forgot Password
              </Typography>

              {error && <p className='error-message'>{error}</p>}

              <div className='reset-password-link'>
                <Typography variant='subtitle1' className='reset-link-text'>
                  We sent you a reset link to your email. Please <br /> check your email and click
                  on the link.
                </Typography>
                <div className='didnt-receive-text'>
                  <Typography variant='body1'>
                    Didn’t receive email? <span className='resend-text'>Resend</span>
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='form-design'>
                <Link to='/login'>
                  <img className='ArrowRight' src={ArrowRight} alt='ArrowRight' />
                </Link>
                <Typography variant='subtitle2' className='forget-password'>
                  Forgot Password
                </Typography>

                {error && <p className='error-message'>{error}</p>}
                <Typography variant='subtitle1'>
                  We will send reset password you link on your mail
                </Typography>
                <form onSubmit={handleSubmit}>
                  <div className='label-wrap'>
                    <InputLabel className='label'>Email</InputLabel>
                    <TextField
                      name='email'
                      id='outlined-required'
                      label='Enter email'
                      variant='outlined'
                      className='email-input'
                      InputProps={{ style: { background: '#F8F9FD' } }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='button-wrap'>
                    <Button
                      variant='contained'
                      className={`reset-password-button ${isButtonDisabled ? 'disabled' : ''}`}
                      disabled={isButtonDisabled}
                      type='submit'
                      style={{
                        width: '60%',
                        height: '10%',
                        padding: '2%',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                      }}
                    >
                      Reset password
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
        <div className='image-content'>
          <img className='password-image' src={Password} alt='Login' />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
