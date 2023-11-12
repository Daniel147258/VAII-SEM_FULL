import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../Subory/images/logo.jpg';
import bag from '../../Subory/images/bag.svg';
import heart from '../../Subory/images/heart.png';
import login from '../../Subory/images/login.png';
import { Link } from 'react-router-dom';
const Navbar = () => {

  const[menu, nastav] = useState(null);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navLogo">
    <div class="container-fluid">
        {/*Lava cast*/}
        <div class="navbar-nav mr-auto">
          <ul class="mr-auto" id='volba'>
          <li className="nav-link" onClick={() => { nastav("Zeny") }}>
            <span className='lop' style={{ fontWeight: menu === "Zeny" ? 'bold' : 'normal' }}>
              <Link to='/zeny' style={{ textDecoration: 'none', color: 'inherit'  }}>Ženy</Link></span>
            {menu === "Zeny" ? <hr style={{ color: 'red', borderWidth: '2px', fontWeight: 'bold' }} /> : <></>}
          </li>
            <li class="nav-link" onClick={()=>{nastav("Muzi")}}>
              <span className='lop'style={{ fontWeight: menu === "Muzi" ? 'bold' : 'normal' }}>
                <Link to='/muzi' style={{ textDecoration: 'none', color: 'inherit'  }}>Muži</Link></span>
            {menu==="Muzi"?<hr style={{ color: 'red',borderWidth: '2px'}}/>:<></>}
          </li>
            <li class="nav-link" onClick={()=>{nastav("Deti")}}>
              <span className='lop' style={{ fontWeight: menu === "Deti" ? 'bolder' : 'normal' }}>
                <Link to='/deti' style={{ textDecoration: 'none', color: 'inherit'  }}>Deti</Link></span>
              {menu==="Deti"?<hr style={{ color: 'red',borderWidth: '2px'}}/>:<></>}
          </li>
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


