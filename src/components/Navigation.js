import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/planet.png';

const Navigation = () => (
  <header>
    <div>
      <img src={logo} alt="logoImg" />
      <h1>Space Travelers&apos;Hub</h1>
    </div>
    <nav>
      <ul>
        <li>
          <NavLink to="/rocket">Rocket</NavLink>
        </li>
        <li>
          <NavLink to="/mission">Mission</NavLink>
        </li>
        <li>
          <NavLink to="/profile">My profile</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
