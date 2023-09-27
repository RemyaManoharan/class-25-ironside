import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, InputLabel } from '@mui/material';
import signupImage from '../../assets/signup.svg';
import Icon from '../../assets/aperture.svg';
import './Signup.css';
import axios from '../../api';

export default function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { signup, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isButtonDisabled = !email || !password || loading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      return setError('Password should be more than 8 characters');
    }
    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      const user = await signup(email, password);

      const config = {
        headers: {
          Authorization: `Bearer ${user.user.accessToken}`,
        },
      };

      const newUser = { uid: user.user.uid, email: user.user.email };

      await axios.post('/user', newUser, config);
      await updateUser(firstName, lastName);
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Failed to create an account');
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
          <div className='form-design'>
            <Typography variant='subtitle2' className='login-title'>
              Sign up
            </Typography>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className='name-wrapper'>
                <div className='label-wrap'>
                  <InputLabel className='label'>First name</InputLabel>
                  <TextField
                    name='fName'
                    id='outlined-required'
                    label='First Name'
                    variant='outlined'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputProps={{ style: { background: '#F8F9FD' } }}
                    required
                    className='email-input'
                  />
                </div>
                <div className='label-wrap'>
                  <InputLabel className='label'>Last name</InputLabel>
                  <TextField
                    name='lName'
                    id='outlined-required'
                    label='Last Name'
                    type='text'
                    variant='outlined'
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputProps={{ style: { background: '#F8F9FD' } }}
                    className='email-input'
                  />
                </div>
              </div>
              <div className='label-wrap'>
                <InputLabel className='label'>Email</InputLabel>
                <TextField
                  name='email'
                  id='outlined-required'
                  label='Enter email'
                  variant='outlined'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  required
                  className='email-input'
                />
              </div>
              <div className='label-wrap'>
                <InputLabel className='label'>Password</InputLabel>
                <TextField
                  name='password'
                  id='outlined-required'
                  label='Enter password'
                  variant='outlined'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  required
                  className='email-input'
                />
              </div>
              <div className='label-wrap'>
                <InputLabel className='label'>Confirm Password</InputLabel>
                <TextField
                  name='passwordConfirm'
                  id='outlined-required'
                  label='Confirm Password'
                  variant='outlined'
                  type='password'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  InputProps={{ style: { background: '#F8F9FD' } }}
                  required
                  className='email-input'
                />
              </div>

              <div>
                <Button
                  variant='contained'
                  className={`signup-button ${loading ? 'disabled' : ''}`}
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
                  Sign up
                </Button>
              </div>
              <div className='form-span'>
                <Typography variant='body1'>
                  Already have an account? <Link to='/login'>Sign In</Link>
                </Typography>
              </div>
            </form>
          </div>
        </div>
        <div className='image-content'>
          <img className='login-image' src={signupImage} alt='Login' />
        </div>
      </div>
    </div>
  );
}
