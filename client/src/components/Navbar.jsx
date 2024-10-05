import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../image/OSKHFO0.jpg';
import { FaBars } from 'react-icons/fa6';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  return (
    <nav>
      <div className='container nav_container'>
        <div className='logo1'>
          <Link to="/">
            <img className='nav_logo' src={Logo} alt="Navbar Logo" />
          </Link>
        </div>

        {/* Toggle button */}
        <button className='nav__toggle-btn' onClick={toggleMenu}>
          <FaBars />
        </button>

        {/* Navigation Menu */}
        <ul className={`nav_menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/profile/:id">Profile</Link></li>
          <li><Link to="/create">Create Post</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
