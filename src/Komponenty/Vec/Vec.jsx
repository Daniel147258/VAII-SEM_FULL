import React from 'react'
import './Vec.css'


const Vec = (props) => {
  return (
    <div class="container">
    <div class="row">
        <div>
            <div class='vec'>
                <img src={props.image} alt="" class="img-fluid" />
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
