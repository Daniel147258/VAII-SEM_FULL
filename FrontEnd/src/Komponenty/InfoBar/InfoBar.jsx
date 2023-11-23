import React from 'react'
import './InfoBar.css'
import truck from '../../Subory/images/truck.png'
import cash from '../../Subory/images/cash.png'
import change from '../../Subory/images/change.png'

const InfoBar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg" id="info">
        <div class="container-fluid" id="info2">
            <div class="navbar-collapse" id="navbarNav2">
                <div class="navbar-nav ml-auto text-left text-lg-left">
                    <img src={truck} alt="truck" id="truck" width="25" height="25"/>
                    <span class="nav-link2">Doručenie a Vrátenie peňazí</span>
                </div>
                <div class="navbar-nav mx-auto text-right">
                    <img src={cash} alt="payIcon" id="payIcon" width="25" height="25"/>
                    <span class="nav-link2">Dobierka</span>
                </div>
                <div class="navbar-nav mr-auto  text-left text-lg-right">
                    <img src={change} alt="change" id="change" width="25" height="25"/>
                    <span class="nav-link2">Možnosť vrátenia do 30 dní</span>
                </div>
            </div>
        </div>
    </nav>
    </div>
  )
}

export default InfoBar