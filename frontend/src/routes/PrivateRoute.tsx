import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  uid?: string;
};

export const PrivateRoute: React.FC<Props> = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <>{children}</>;
  }

  return <Navigate to='/login' />;
};

export default PrivateRoute;
