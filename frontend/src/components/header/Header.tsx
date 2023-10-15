import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './header.module.css';
import me from '../../assets/me.png';
import useAdminStore from '../../store/admin.store';
import { getFormattedName } from './utils';
import useJobStore from '../../store/jobstore';

function Header() {
  const { logout, currentUser } = useContext(AuthContext);
  const resetUser = useAdminStore((state) => state.resetUser);
  const resetJobStore = useJobStore((state) => state.resetJobStore);
  const navigate = useNavigate();
  const displayName = currentUser.displayName.split(' ');

  const formattedFirstName = getFormattedName(displayName[0]);
  const formattedLastName = getFormattedName(displayName[1]);

  const userName = `${formattedFirstName} ${formattedLastName}`;
  const handleLogout = async () => {
    try {
      resetJobStore();
      resetUser();
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  const location = useLocation();

  const getPageTitle = (): string => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Home';
      case '/event':
        return 'Event';
      case '/schedule':
        return 'Schedule';
      case '/history':
        return 'History';
      case '/company':
        return 'Company';
      case '/messages':
        return 'Messages';
      case '/admin':
        return 'Admin';

      default:
        return 'Dashboard';
    }
  };

  const pageTitle: string = getPageTitle();
  return (
    <section className={style.header}>
      <div className={style.pageSelected}>{pageTitle}</div>
      <div className={style.userInfo}>
        <div>
          <img src={me} alt='me' />
        </div>

        <div>{userName}</div>

        <div className={style.logOut}>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </section>
  );
}

export default Header;
