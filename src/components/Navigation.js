import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/planet.png';

const Navigation = () => (
  <header>
    <div className="logo-container">
      <img src={logo} alt="logoImg" />
      <h1>Space Travelers&apos; Hub</h1>
    </div>
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Rocket</NavLink>
        </li>
        <li>
          <NavLink to="/mission">Missions</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">My Profile</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
