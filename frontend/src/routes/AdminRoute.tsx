import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';
import useAdminStore from '../store/admin.store';
import ErrorPage from '../pages/errorPage/ErrorPage';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  uid?: string;
};

const AdminRoute: React.FC<Props> = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentUser === null) {
      setError(true);
      return;
    }
    setError(false);
    fetchCurrentUser(currentUser.uid);
  }, []);

  const isUserAdmin = user?.user_type === 'admin';

  if (user) {
    if (isUserAdmin) {
      return <>{children}</>;
    }

    return <Navigate to='/' />;
  }
  return <div>{error && <ErrorPage />}</div>;
};

export default AdminRoute;
