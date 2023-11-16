import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Subory/images/logo.jpg';
import bag from '../../Subory/images/bag.svg';
import heart from '../../Subory/images/heart.png';
import login from '../../Subory/images/login.png';
import house from '../../Subory/images/house.svg';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../Kontext/GlobalContext';

const Navbar = () => {
  const { aktualnaCategoria } = useContext(GlobalContext);
  const [menu, nastav] = useState(aktualnaCategoria);
  const lokacia = useLocation();

  useEffect(() => {
    const fullCesta = lokacia.pathname;
    const pathParts = fullCesta.split('/').filter(Boolean);
  
    if (pathParts.some(part => ['women', 'men', 'kid'].includes(part))) {
      const category = pathParts.find(part => ['women', 'men', 'kid'].includes(part));
      nastav(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      nastav(aktualnaCategoria);
    }
  }, [lokacia.pathname, aktualnaCategoria]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navLogo">
      <div className="container-fluid">
        {/* Lava cast */}
        <div className="navbar-nav mr-auto">
          <ul className="mr-auto" id="volba">
            <Link to='/women' className='nav-link'>
              <li>
                <span className='lop' style={{ fontWeight: menu === "Women" ? 'bold' : 'normal' }}>Ženy</span>
                {menu === 'Women' && <hr style={{ color: 'red', borderWidth: '2px', fontWeight: 'bold' }} />}
              </li>
            </Link>

            <Link to='/men' className='nav-link'>
              <li>
                <span className='lop' style={{ fontWeight: menu === "Men" ? 'bold' : 'normal' }}>Muži</span>
                {menu === 'Men' && <hr style={{ color: 'red', borderWidth: '2px' }} />}
              </li>
            </Link>

            <Link to='/kid' className='nav-link'>
              <li>
                <span className='lop' style={{ fontWeight: menu === "Kid" ? 'bold' : 'normal' }}>Deti</span>
                {menu === 'Kid' && <hr style={{ color: 'red', borderWidth: '2px' }} />}
              </li>
            </Link>
          </ul>
        </div>

        {/* Stred */}
        <div className="mx-auto">
          <div className="logo">
            <img src={logo} alt="logo" id="logo" width="70" height="70"></img>
          </div>
        </div>

        {/* Pravobok */}
        <div className="navbar-nav ml-auto">
          {lokacia.pathname !== '/' &&(
            <Link className='nav-link' to='/'><img src={house} height="35" width="35" alt="" /></Link>
          )}
          <Link className="nav-link" to='/login'><img src={login} height="35" alt='login' width="35"></img></Link>
          <Link className="nav-link" to='/zoznamOblubenych'><img src={heart} id="heart" alt='heart' height="35" width="35"></img></Link>
          <div className='nav-cart'>
            <Link className="nav-link" id='nakup' to='/nakup'><img src={bag} alt="nakup" id="nakup" height="33" width="33"></img></Link>
            <div className='nav-bag'>0</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
