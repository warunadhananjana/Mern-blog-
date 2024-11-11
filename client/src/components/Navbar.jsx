import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../image/OSKHFO0.jpg';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { UserContext } from '../context/userContext';

const Header = () => {
  // State to toggle menu based on screen width
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const {currentUser} = useContext(UserContext)
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <nav>
      <div className='container nav_container'>
        <div className='logo1'>
          <Link to="/" onClick={closeNavHandler}>
            <img className='nav_logo' src={Logo} alt="Navbar Logo" />
          </Link>
        </div>

        {/* Toggle button */}
        <button className='nav__toggle-btn' onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        { currentUser?.id && isNavShowing && <ul className={`nav_menu ${isNavShowing ? 'active' : ''}`}>
          <li><Link to="/profile/ggdff" onClick={closeNavHandler}>Profile</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul> }
         {/* Navigation Menu */}
         { !currentUser?.id && isNavShowing && <ul className={`nav_menu ${isNavShowing ? 'active' : ''}`}>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
        </ul> }
      </div>
    </nav>
  );
};

export default Header;
