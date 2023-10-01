import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/header/Header';
import NavBar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import style from './main.module.css';
import useAdminStore from '../../store/admin.store';
import { AuthContext } from '../../contexts/authContext';

function Main() {
  const [showNav, setShowNav] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);

  useEffect(() => {
    fetchCurrentUser(currentUser.uid);
  }, []);

  const isUserAdmin = user?.user_type === 'admin';

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className={style.main}>
      <button className={`${style.toggleBtn} ${showNav ? style.hidden : ''}`} onClick={toggleNav}>
        <img src={menu} alt='menu' />
      </button>

      <div className={`${style.navBar} ${showNav ? style.navShow : ''}`} onClick={toggleNav}>
        <NavBar />
      </div>

      <div className={style.header}>
        <Header />
      </div>

      <div className={style.content}>
        {isUserAdmin && 'this is admin'}
        <Outlet />
      </div>
    </div>
  );
}
export default Main;
