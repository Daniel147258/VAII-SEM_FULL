import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Subory/images/logo.jpg';
import bag from '../../Subory/images/bag.svg';
import heart from '../../Subory/images/heart.png';
import login from '../../Subory/images/login.png';
import axios from 'axios';
import house from '../../Subory/images/house.svg';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../Kontext/GlobalContext';
import { Container, Row, Col, Button } from 'react-bootstrap'

const Navbar = () => {
  const { ak, nastavKategoriu } = useContext(GlobalContext);
  const [menu, nastavMenu] =  useState(localStorage.getItem('aktualnePohlavie') || ''); 
  const lokacia = useLocation();
  const [pohlavia, setPohlavia] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3008/api/pohlavie' , {
            
        })
        .then(response => {
          setPohlavia(response.data)
        })
        .catch(error => {
            console.error('Error fetching categries:', error);
        });
  })

  const handleChangePohlaive = (e) => {
    if(e.target.value === localStorage.getItem('aktualnePohlavie')){
      localStorage.setItem('aktualnePohlavie', '');
      nastavMenu('');
    }
    else{
      nastavMenu(e.target.value);
      localStorage.setItem('aktualnePohlavie', e.target.value);
  
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navLogo">
      <div className="container-fluid">
        {/* Lava cast */}
        <div className="navbar-nav mr-auto">
        <ul className="mr-auto" id="volba">
            {pohlavia.map((pohlavie, i) => {
              return (
                <div key={i} >
                  <Link to={`/${pohlavie.pohlavie}`} className='nav-link'>
                    <li >
                      <Button value={pohlavie.pohlavie} className='lop' style={{ marginTop: '-15px' ,marginLeft: '-10px', border: 'none', 
                      height: '10px',background: 'none', fontWeight: menu === pohlavie.pohlavie ? 'bold' : 'normal' }} onClick={handleChangePohlaive}
                      >{pohlavie.pohlavie}</Button>
                      {menu === pohlavie.pohlavie && <hr style={{ color: 'red', borderWidth: '2px', fontWeight: 'bold' }} />}
                    </li>
                  </Link>
                </div>
              );
            })}
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
