import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/login.svg';
import Icon from '../../assets/aperture.svg';
import style from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate('/');
    }
  }, []);

  const handleSubmit = async (e: any) => {
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
    <div className={style.mainContainer}>
      <div className={style.formHeader}>
        <p>
          <img className={style.icon} src={Icon} alt='Icon' /> Dashboard
        </p>
      </div>
      <div className={style.mainContent}>
        <div className={style.formContent}>
          <div className={style.formDesign}>
            <div className={style.head}>
              <h2 className={style.loginTitle}>Log in</h2>
              <p>Easy steps to enter the platform</p>
              {error && <p className={style.errorMessage}>{error}</p>}
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.labelWrap}>
                <label className={style.label}>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Enter email'
                  className={style.input}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.labelWrap}>
                <label className={style.label}>Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Enter password'
                  className={style.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={style.buttonWrap}>
                <p className={style.forgetPass}>
                  <Link to='/password' className={style.formLink}>
                    Forgot Password
                  </Link>
                </p>

                <button
                  className={`${style.loginButton} ${isButtonDisabled ? style.disabled : ''}`}
                  disabled={isButtonDisabled}
                  type='submit'
                >
                  Log in
                </button>
              </div>
            </form>

            <div className={style.formSpan}>
              <p>
                Don’t have an account?
                <Link to='/signup' className={style.formLink}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className={style.imageContent}>
          <img className={style.loginImage} src={LoginImage} alt='Login' />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
