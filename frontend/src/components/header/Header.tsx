import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import './header.css';
import me from '../../assets/me.png';

function Header() {
  const { logout, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='info-container'>
      <div className='page-selected'>demo</div>
      <div className='input'>
        <input type='text' placeholder='search anything ....' />
      </div>
      <div className='hidden'>
        <img src={me} alt='me' />
      </div>

      <div className='hidden'>
        <strong>{currentUser.displayName}</strong>
      </div>

      <div className='hidden'>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </section>
  );
}

export default Header;
