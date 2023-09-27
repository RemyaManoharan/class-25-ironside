import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

interface Props {
  component: () => React.ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ component: Component }: Props) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <>{Component}</>;
  }

  return <Navigate to='/login' />;
};

export default PrivateRoute;
