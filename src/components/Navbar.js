import React from 'react';

const Navbar = () => {
  return (
    <nav className="NavbarItems">
      <h1>
        Hot<span>Pot</span>
      </h1>
      <div className="menu-icon"></div>
      <ul className="nav-menu">
        <li>
          <a href="#!">Home</a>
        </li>
        <li>
          <a href="#!">Recipes</a>
        </li>
        <li>
          <a href="#!">About</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
