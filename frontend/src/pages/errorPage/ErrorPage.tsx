import React from 'react';
import style from './errorPage.module.css';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className={style.error}>
      <h1 className={style.oops}>Oops! Something went wrong.</h1>
      <p className={style.message}>Sorry, we encountered an error while processing your request.</p>
      <p className={style.message}>
        Please try again later or contact Admin if the problem persists.
      </p>
      <p className={style.message}>
        Back to{' '}
        <Link to={'/login'} className={style.back}>
          LogIn
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
