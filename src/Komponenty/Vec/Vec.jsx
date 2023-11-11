import React from 'react'
import './Vec.css'
import { Link } from 'react-router-dom'

const Vec = (props) => {
  return (
    <div className='vec'>
        <img src={props.image} alt="" />
        <p>{props.name}</p>
      <div className="cena">
        <div className="novaCena">
            ${props.new_price}
        </div>
        <div className="staraCena">
            ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Vec
