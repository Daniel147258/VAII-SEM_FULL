import React from 'react'
import Nakupovanie from '../Komponenty/Nakupovanie/Nakupovanie'
import InfoBar from '../Komponenty/InfoBar/InfoBar'
const Kategoria = (props) => {
  return (
    <div>
      <InfoBar/>
      <Nakupovanie {...props}/>
    </div>
  )
}

export default Kategoria