import React, { useState, useEffect } from 'react';
import './Vec.css';
import { Link } from 'react-router-dom';
import heart from '../../Subory/images/heart.png';
import heartFill from '../../Subory/images/heart-fill.png';

const Vec = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOblubene, setOblubene] =  useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const heart2 = isOblubene ? heartFill : heart; 
  
  const handleIsOblubene = () =>{
    setOblubene(!isOblubene);
  }

  const handleMouseOver = () => {
    setIsHovered(true);

  };

  const handleMouseOut = () => {
    setIsHovered(false);

  };

  useEffect(() => {
    if (props.image && props.image.type === 'Buffer' && Array.isArray(props.image.data)) {
      const blob = new Blob([new Uint8Array(props.image.data)], { type: 'image/jpeg' });
      setImageUrl(URL.createObjectURL(blob));
    }
  }, [props.image]);
  
  return (
    <div className="container" >
    <div className="row" >
      <div className="vec-container"  >
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={`vec ${isHovered ? 'hovered' : ''}`} >
          {isHovered && (
            <div className="hoverOverlay" >
              <button className='addToOblubene' onClick={handleIsOblubene}>
                <img className="heartIcon" src={heart2} alt="Heart" height={33} width={33} />
              </button>
            </div>
          )}
          <Link to={`/${props.category}/${props.id}`}>
            {imageUrl && (<img className="img-fluid" src={imageUrl} id='hlavny' alt='hlavny' />)}
            {imageUrl === null && (<img className="img-fluid" src={props.image} id='hlavny' alt='hlavny' />)}
          </Link>
          </div>
          </div>
          {!isHovered && (
            <div>
              <p>{props.name}</p>
              <div className="cena">
                <div className="novaCena">
                  {props.new_price}€
                </div>
                <div className="staraCena">
                  {props.old_price}€
                </div>
              </div>
            </div>
          )}
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {isHovered && (
          <div className='jozo'>
             <div className="cena" id='cen' >
                <div className="novaCena">
                  {props.new_price}€
                </div>
                <div className="staraCena">
                  {props.old_price}€
                </div>
              </div>
            <p className='' id='ds' >Dostupné veľkosti: X, S, M, L, XL</p>
            <div className="buttonContainer">
              <button className="addToCartButton">Vložiť do košíka</button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Vec;
