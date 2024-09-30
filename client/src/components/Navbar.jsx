import React from 'react';
import {Link} from "react-router-dom"
import Logo from '../image/OSKHFO0.jpg'
import { FaBars } from "react-icons/fa6";
// import {AiOutlineClone} from "react-icons/ai"

const Header = () => {
  return (
    <nav>
      <div className='container nav_container'>
        <Link to="/" >
            <img className='nav_logo' src={Logo} alt="Navbar Logo"/>
        </Link>
            <ul className='nav_menu'>
              <li><Link to="/profile/:id">Ernest Achiever</Link></li>
              <li><Link to="/create">Crete post</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
            <button className='nav__toggle-btn'>
                 <FaBars/>
            </button>

        
      </div>
    </nav>
  );
};

export default Header;
