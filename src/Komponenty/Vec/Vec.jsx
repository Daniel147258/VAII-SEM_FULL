import React from 'react'
import './Vec.css'
import { Link } from 'react-router-dom'

const Vec = (props) => {
  return (
    <div class="container">
    <div class="row">
        <div>
            <div class='vec'>
                <Link to={`/${props.category}/${props.id}`}>
                    <img src={props.image} alt="" class="img-fluid" /></Link>
                <p>{props.name}</p>
                <div class="cena">
                    <div class="novaCena">
                        €{props.new_price}
                    </div>
                    <div class="staraCena">
                        €{props.old_price}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default Vec
