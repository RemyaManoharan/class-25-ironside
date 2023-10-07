import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';
import useAdminStore from '../store/admin.store';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  uid?: string;
};

const AdminRoute: React.FC<Props> = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);

  useEffect(() => {
    fetchCurrentUser(currentUser.uid);
  }, []);

  const isUserAdmin = user?.user_type === 'admin';

  if (user) {
    if (isUserAdmin) {
      return <>{children}</>;
    }

    return <Navigate to='/' />;
  }
  return <div></div>;
};

export default AdminRoute;
