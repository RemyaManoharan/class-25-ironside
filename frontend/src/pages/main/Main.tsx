import React, { useState } from 'react';
import Header from '../../components/header/Header';
import NavBar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import style from './main.module.css';

function Main() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div className={style.main}>
      <button className={style.toggleBtn} onClick={toggleNav}>
        <img src={menu} alt='menu' />
      </button>

      <div className={`${style.navBar} ${showNav ? style.navShow : ''}`} onClick={toggleNav}>
        <NavBar />
      </div>

      <div className={style.header}>
        <Header />
      </div>

      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
}
export default Main;
