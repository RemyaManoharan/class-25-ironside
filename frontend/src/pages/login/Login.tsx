import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import LoginImage from '../../assets/login.svg';
import Icon from '../../assets/aperture.svg';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);

      setError('Failed to login check your info');
    }

    setLoading(false);
  };
  const isButtonDisabled = !email || !password || loading;

  return (
    <div className='main-container'>
      <div className='header'>
        <Typography component='p' variant='h5'>
          <img className='Icon' src={Icon} alt='Icon' /> Dashboard
        </Typography>
      </div>
      <div className='main-content'>
        <div className='form-content'>
          <div className='form-design'>
            <Typography variant='subtitle2' className='login-title'>
              Log in
            </Typography>
            <Typography variant='subtitle1'>Easy steps to enter the platform</Typography>
            {error && <p className='error-message'>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className='label-wrap'>
                <InputLabel className='label'>Email</InputLabel>
                <TextField
                  name='email'
                  id='email'
                  label='Enter email'
                  variant='outlined'
                  className='email-input'
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='label-wrap'>
                <InputLabel className='label'>Password</InputLabel>
                <TextField
                  name='password'
                  id='password'
                  label='Enter password'
                  variant='outlined'
                  className='email-input'
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <FormControlLabel
                control={<Checkbox name='rem-password' value='rem-password' />}
                label='Remember me'
              />
              <div className='button-wrap'>
                <Typography variant='body1' className='forget-pass'>
                  <Link to='/password'>Forgot Password</Link>
                </Typography>

                <Button
                  variant='contained'
                  className={`login-button ${loading ? 'disabled' : ''}`}
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
                  Log in
                </Button>
              </div>
            </form>
          </div>
          <div className='form-span'>
            <Typography variant='body1'>
              Don’t have an account? <Link to='/signup'>Sign Up</Link>
            </Typography>
          </div>
        </div>
        <div className='image-content'>
          <img className='login-image' src={LoginImage} alt='Login' />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
