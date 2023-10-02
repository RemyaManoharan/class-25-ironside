import { Link } from 'react-router-dom';
import icon from '../../assets/icon.png';
import style from './nav.module.css';
import category from '../../assets/Category.png';
import ticket from '../../assets/Ticket.png';
import calendar from '../../assets/Calendar.png';
import circle from '../../assets/Circle.png';
import work from '../../assets/Work.png';
import sidebar from '../../assets/Sidebar.png';
import { useState } from 'react';

function NavBar() {
  const [selectedLink, setSelectedLink] = useState('/');
  const navLinks = [
    { to: '/', icon: category, text: 'Home' },
    { to: '/event', icon: ticket, text: 'Event' },
    { to: '/schedule', icon: calendar, text: 'Schedule' },
    { to: '/history', icon: circle, text: 'History' },
    { to: '/company', icon: work, text: 'Company' },
    { to: '/messages', icon: sidebar, text: 'Messages' },
  ];

  return (
    <div className={style.content}>
      <div className={style.header}>
        <span className={style.icon}>
          <img src={icon} alt='dashboard icon' />
        </span>
        <h1>Dashhhhboard</h1>
      </div>
      <div className={style.navLinkContainer}>
        {navLinks.map((link, index) => (
          <Link
            to={link.to}
            className={style.link}
            key={index}
            onClick={() => setSelectedLink(link.to)}
          >
            <div
              className={`${style.navLink} ${selectedLink === link.to ? style.selectedLink : ''} `}
            >
              <span className={style.icon}>
                <img src={link.icon} alt='dashboard icon' />
              </span>
              {link.text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
