import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../Subory/images/logo.jpg';
import bag from '../../Subory/images/bag.svg';
import heart from '../../Subory/images/heart.png';
import login from '../../Subory/images/login.png';

const Navbar = () => {

  const[menu, nastav] = useState("Zeny");

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navLogo">
    <div class="container-fluid">
        {/*Lava cast*/}
        <div class="navbar-nav mr-auto">
          <ul class="mr-auto" id='volba'>
            <li class="nav-link" onClick={()=>{nastav("Zeny")}}>Ženy{menu==="Zeny"?<hr style={{ color: 'red',borderWidth: '2px'}}/>:<></>}</li>
            <li class="nav-link" onClick={()=>{nastav("Muzi")}}>Muži{menu==="Muzi"?<hr style={{ color: 'red',borderWidth: '2px'}}/>:<></>}</li>
            <li class="nav-link" onClick={()=>{nastav("Deti")}}>Deti{menu==="Deti"?<hr style={{ color: 'red',borderWidth: '2px'}}/>:<></>}</li>
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
            <a class="nav-link" href="Prihlasenie.html"><img src={login} height="35" alt='login' width="35"></img></a>
            <a class="nav-link" href="ale2"><img src={heart} id="heart" alt='heart' height="35" width="35"></img></a>
            <div className='nav-cart'>
              <a class="nav-link" href="ale3"><img src={bag} alt="nakup" id="nakup" height="33" width="33"></img></a>
              <div className='nav-bag'>0</div>
            </div>
        </div>
        
    </div>
  </nav>
  )
}

export default Navbar


