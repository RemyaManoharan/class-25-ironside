import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/header/Header';
import NavBar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import './main.css';
import useAdminStore from '../../store/admin.store';
import { AuthContext } from '../../contexts/authContext';

function Main() {
  const [showNav, setShowNav] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const fetchCurrentUser = useAdminStore((state) => state.fetchCurrentUser);
  const user = useAdminStore((state) => state.user);
  useEffect(() => {
    (async () => {
      try {
        await fetchCurrentUser(currentUser.uid);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  useEffect(() => {
    setIsUserAdmin(user?.user_type === 'admin');
  }, [user]);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <section className='grid-container'>
      <button className={`toggle-button ${showNav ? 'hidden' : ''}`} onClick={toggleNav}>
        <img src={menu} alt='menu' />
      </button>

      <nav className={`nav ${showNav ? 'nav-show' : ''}`}>
        <NavBar />
      </nav>

      <div className='header-outlet-container'>
        <div className='grid-display'>
          <header className='header'>
            <Header />
          </header>

          <div className='outlet'>
            {isUserAdmin && 'this is admin'}
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
