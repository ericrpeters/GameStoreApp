import React from 'react';
import { Link } from 'react-router-dom';


function Navigation({onLogout}) {
  return (
    <nav className='nav-container'>
        <div className='nav-links'>
            <Link to="/home">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/buy">Buy</Link>
            <Link to="/sell">Sell</Link>
            <Link to="/about">About</Link>
            <button onClick={onLogout}>Logout</button>
        </div>           
    </nav>
  );
}

export default Navigation;