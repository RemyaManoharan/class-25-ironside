import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import signupImage from '../../assets/signup.svg';
import Icon from '../../assets/aperture.svg';
import api from '../../api';
import styles from './Signup.module.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isButtonDisabled = !email || !password || loading;

  const handleSubmit = async (e: any) => {
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

      const newUser = { uid: user.user.uid, email: user.user.email };
      const request = await api();
      await request.post('/user', newUser);
      await updateUser(firstName, lastName);

      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formHeader}>
        <p>
          <img className={styles.icon} src={Icon} alt='Icon' /> Dashboard
        </p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.formContent}>
          <div className={styles.formDesign}>
            <h2 className={styles.loginTitle}>Sign up</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={styles.nameWrapper}>
                <div className={styles.labelWrap}>
                  <label className={styles.label}>First name</label>
                  <input
                    name='fName'
                    type='text'
                    placeholder='Enter your First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`${styles.input} ${styles.inputName}`}
                    required
                  />
                </div>
                <div className={styles.labelWrap}>
                  <label className={styles.label}>Last name</label>
                  <input
                    name='lName'
                    type='text'
                    placeholder='Enter your Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`${styles.input} ${styles.inputName}`}
                    required
                  />
                </div>
              </div>
              <div className={styles.labelWrap}>
                <label className={styles.label}>Email</label>
                <input
                  name='email'
                  type='email'
                  placeholder='Enter your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.labelWrap}>
                <label className={styles.label}>Password</label>
                <input
                  name='password'
                  type='password'
                  placeholder='Enter your Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.labelWrap}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  name='passwordConfirm'
                  type='password'
                  placeholder='Confirm Password'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.signupButtonContainer}>
                <button
                  className={`${styles.signupButton} ${isButtonDisabled ? styles.disabled : ''}`}
                  disabled={isButtonDisabled}
                  type='submit'
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className={styles.formSpan}>
              <p>
                Already have an account?
                <Link to='/login' className={styles.formLink}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.imageContent}>
          <img className={styles.loginImage} src={signupImage} alt='Login' />
        </div>
      </div>
    </div>
  );
}
