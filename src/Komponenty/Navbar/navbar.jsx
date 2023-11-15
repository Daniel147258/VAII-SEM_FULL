import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../../Subory/images/logo.jpg';
import bag from '../../Subory/images/bag.svg';
import heart from '../../Subory/images/heart.png';
import login from '../../Subory/images/login.png';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../Kontext/GlobalContext';
const Navbar = () => {

  const { aktualnaCategoria } = useContext(GlobalContext);
  const[menu, nastav] = useState(aktualnaCategoria);
  const lokacia = useLocation();
  
  useEffect(() => {
    const cestaCasti = lokacia.pathname.split('/').pop();
    if (['zeny', 'muzi', 'deti'].includes(cestaCasti)) {
      nastav(cestaCasti.charAt(0).toUpperCase() + cestaCasti.slice(1)); // Nastavte prvý písmeno na veľké
    } else {
      nastav(aktualnaCategoria);
    }
  }, [lokacia.pathname, aktualnaCategoria]);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navLogo">
    <div class="container-fluid">
        {/*Lava cast*/}
        <div class="navbar-nav mr-auto">
          <ul class="mr-auto" id='volba'>
          <Link to='/zeny' className='nav-link' onClick={() => nastav('Zeny')}>
        <li>
          <span className='lop' style={ {fontWeight: menu === "Zeny" ? 'bold':'normal'}}>Ženy</span>
          {menu === 'Zeny' && <hr style={{ color: 'red', borderWidth: '2px', fontWeight: 'bold' }} />}
        </li>
      </Link>

      <Link to='/muzi' className='nav-link' onClick={() => nastav('Muzi')}>
        <li>
          <span className='lop' style={ {fontWeight: menu === "Muzi" ? 'bold':'normal'}}>Muži</span>
          {menu === 'Muzi' && <hr style={{ color: 'red', borderWidth: '2px' }} />}
        </li>
      </Link>

      <Link to='/deti' className='nav-link' onClick={() => nastav('Deti')}>
        <li>
          <span className='lop' style={ {fontWeight: menu === "Deti" ? 'bold':'normal'}}>Deti</span>
          {menu === 'Deti' && <hr style={{ color: 'red', borderWidth: '2px' }} />}
        </li>
      </Link>
            </ul>
        </div>

         {/*Stred*/}
        <div class="mx-auto">
            <div class="logo">
                <img src={logo} alt="logo" id="logo" width="70" height="70"></img>
            </div>
        </div>
         {/*Pravobok*/}
        <div class="navbar-nav ml-auto">
            <Link class="nav-link" to='/login'><img src={login} height="35" alt='login' width="35"></img></Link>
            <Link class="nav-link" to='/zoznamOblubenych'><img src={heart} id="heart" alt='heart' height="35" width="35"></img></Link>
            <div className='nav-cart'>
              <Link class="nav-link" id='nakup' to='/nakup'><img src={bag} alt="nakup" id="nakup" height="33" width="33"></img></Link>
              <div className='nav-bag'>0</div>
            </div>
        </div>
        
    </div>
  </nav>
  )
}

export default Navbar


