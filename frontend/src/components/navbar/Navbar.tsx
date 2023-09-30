import { Link } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './navBar.css';
import category from '../../assets/Category.png';
import ticket from '../../assets/Ticket.png';
import calendar from '../../assets/Calendar.png';
import circle from '../../assets/Circle.png';
import work from '../../assets/Work.png';
import sidebar from '../../assets/Sidebar.png';

function NavBar() {
  return (
    <div className='navbar-container'>
      <div className='header'>
        <span className='icon'>
          <img src={icon} alt='dashboard icon' />
        </span>
        <h1>Dashboard</h1>
      </div>
      <Link to={'/'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={category} alt='dashboard icon' />
          </span>
          Home
        </div>
      </Link>
      <Link to={'/event'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={ticket} alt='dashboard icon' />
          </span>
          Event
        </div>
      </Link>
      <Link to={'/schedule'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={calendar} alt='dashboard icon' />
          </span>
          Schedule
        </div>
      </Link>
      <Link to={'/history'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={circle} alt='dashboard icon' />
          </span>
          History
        </div>
      </Link>
      <Link to={'/company'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={work} alt='dashboard icon' />
          </span>
          Company
        </div>
      </Link>
      <Link to={'/messages'}>
        <div className='nav-link'>
          <span className='icon'>
            <img src={sidebar} alt='dashboard icon' />
          </span>
          Messages
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
