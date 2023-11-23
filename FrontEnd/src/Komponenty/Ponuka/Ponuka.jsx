// Jedna sa o komponent kde je moznost vytvorenia ponuky s obrazkom 
import React from 'react'
import './Ponuka.css'


const Ponuka = () => {
  return (
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-6 text-left text-with-background">
            <h1 class="display-4">Zľava 20€ iba pre teba</h1>
            <button class="btn btn-primary" id='zlava'>Dostaň teraz</button>
        </div>
      </div>
    </div>
  )
}

export default Ponuka