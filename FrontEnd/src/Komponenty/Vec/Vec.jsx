import React, { useState } from 'react';
import './Vec.css';
import { Link } from 'react-router-dom';
import heart from '../../Subory/images/heart.png';
import heartFill from '../../Subory/images/heart-fill.png';

const Vec = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOblubene, setOblubene] =  useState(false);

  const heart2 = isOblubene ? heartFill : heart; 
  
  const handleIsOblubene = () =>{
    setOblubene(!isOblubene);
  }
  return (
    <div className="container">
      <div className="row">
        <div>
          <div
            className="vec"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
              {isHovered && (
                <div className="hoverOverlay">
                    <button className='addToOblubene' onClick={handleIsOblubene}>
                        <img className="heartIcon" src={heart2} alt="Heart" height={35} width={35} />
                    </button>
                </div>
              )}
            <Link to={`/${props.category}/${props.id}`}>
              <img className="img-fluid" src={props.image} id='hlavny' alt='hlavny' />
            </Link>
            <p>{props.name}</p>
            <div className="cena">
              <div className="novaCena">
                €{props.new_price}
              </div>
              <div className="staraCena">
                €{props.old_price}
              </div>
            </div>
            {isHovered && (
              <div className="">
                <button className="addToCartButton">Vložiť do košíka</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vec;
