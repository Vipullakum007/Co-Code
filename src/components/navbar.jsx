import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';
import { useAuth } from '../store/auth';

const Navbar = () => {
   const [dropdown, setDropdown] = useState(false);
   const { isLoggedIn } = useAuth();

   return (
      <div className="navbar">
         <div className="container">
            <div className="navbar-logo">
               <img src={logo} alt="Logo" height={50} width={150} />
            </div>
            <nav>
               <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li
                     onMouseEnter={() => setDropdown(true)}
                     onMouseLeave={() => setDropdown(false)}
                  >
                     <NavLink to="/features">Features</NavLink>
                     {dropdown && (
                        <ul className="dropdown">
                           <li><NavLink to="/feature/editor">Editor</NavLink></li>
                           <li><NavLink to="/feature/group-chat">Group Chat</NavLink></li>
                           <li><NavLink to="/feature/collaborators">Collaborators</NavLink></li>
                           <li><NavLink to="/feature/settings">Settings</NavLink></li>
                           <li><NavLink to="/feature/runner">Runner</NavLink></li>
                        </ul>
                     )}
                  </li>
                  <li><NavLink to="/room">Room</NavLink></li>
                  <li><NavLink to="/contact">Contact</NavLink></li>
                  {
                     isLoggedIn ?
                        <li><NavLink to="/logout">Logout</NavLink></li>
                        : <>
                           <li><NavLink to="/signup">SignUp</NavLink></li>
                           <li><NavLink to="/login">Login</NavLink></li>
                        </>
                  }


               </ul>
            </nav>
         </div>
      </div>
   );
};

export default Navbar;
