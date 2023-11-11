import React from 'react'
import PomocnyNavBar from '../../Komponenty/PomocnyNavBar/PomocnyNavBar'
import Navbar from '../../Komponenty/Navbar/Navbar'
import Menu from '../../Komponenty/Menu/Menu'
import Carousel from '../../Komponenty/Carousel/Carousel'
import Footer from '../../Komponenty/Footer/Footer'
import Ponuka from '../../Komponenty/Ponuka/Ponuka'

const Uvodna = () => {
  return (
    <div>
        <PomocnyNavBar/>
        <Navbar/>
        <Menu/>
        <Carousel/>
        <Ponuka/>
        <Footer/>
        
    </div>
  )
}

export default Uvodna