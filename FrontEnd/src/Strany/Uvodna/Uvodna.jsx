import React, { useState} from 'react'
import Carousel from '../../Komponenty/Carousel/Carousel'
import Footer from '../../Komponenty/Footer/Footer'
import Ponuka from '../../Komponenty/Ponuka/Ponuka'
import Kolekcia from '../../Komponenty/Kolekcia/Kolekcia'



const Uvodna = () => {
  const [jeUspesnaRegistracia, setuspesneRegistracia] = useState(false);

  const handleRegistracia = () =>{
    setuspesneRegistracia(true);
  }

  const closeModalRegistracia = () => {
    setuspesneRegistracia(false);
  }

  return (
    <div>
        <Carousel/>
        <Kolekcia/>
        <Ponuka/>
        <Footer/>
        
    </div>
  )
}

export default Uvodna