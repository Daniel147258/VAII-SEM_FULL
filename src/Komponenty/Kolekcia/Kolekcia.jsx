import React from 'react'
import './Kolekcia.css'
import kolekcie2 from '../Assets/new_collections'
import Vec from '../Vec/Vec'
const Kolekcia = () => {
  return (
    <div className='container kolekcia-container'>
    <h1 className='text-center'>Produkty</h1>
    <hr />

    <div className='row'>
      {kolekcie2.map((vec, i) => {
        return (
          <div key={i} className='col-lg-4 col-md-6 mb-4'>
            <Vec
              id={vec.id}
              name={vec.name}
              image={vec.image}
              new_price={vec.new_price}
              old_price={vec.old_price}
            />
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default Kolekcia