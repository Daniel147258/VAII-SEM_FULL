import React, { useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProductDisplay = (props) => {
  const { product } = props;
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };


  const handleSizeClick = (size) => {
    setSelectedSize(size);
    controlSelectedSize(size);
  };

  
    const controlSelectedSize = (size) => {
    if (size === null){ 
        setErrorMessage('Zvolte veľkosť produktu!');
    }
    else{
      setErrorMessage(null);
    }
  };
  
  const handleAddCart = () => {
    if(selectedSize === null){
      setErrorMessage('Zvolte veľkosť produktu!');
    }
  }
  const sizeButtons = document.querySelectorAll('.size-button');
  sizeButtons.forEach(button => {
    button.classList.remove('selected');
    if (button.id === selectedSize) {
      button.classList.add('selected')
    }
  });

  return (
    <div className='container' id='block'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='productdisplay-img'>
            <img className='productdisplay-main-img img-fluid' src={selectedImage} alt="" />
          </div>
          <div className='row'>
          {(Array.isArray(product.image) ? product.image : [product.image]).map((thumbnail, index) => (
              <div className='col-md-3'>
              <img
                src={product.image}
                alt=""
                className={`img-fluid ${selectedImage === product.image ? 'selected' : ''}`}
                onClick={() => handleThumbnailClick(product.image)}
              />
            </div>
            ))}
          </div>
        </div>
        <div className='col-md-6'>
          <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-stars'>
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_icon} alt="" />
              <img src={star_dull_icon} alt="" />
              <p>(122)</p>
            </div>
            <div className='productdisplay-right-prices'>
              <div className='productdisplay-right-price-old'>€{product.old_price}</div>
              <div className='productdisplay-right-price-new'>€{product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
              {product.description}
            </div>
            <div className='productdisplay-right-size'>
              <h1>Zvolte Velkost</h1>
              <div className='productdisplay-right-sizes'>
              {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
               <button
               key={index}
               id={size}
               className={`size-button ${selectedSize === size ? 'selected' : ''}`}
               onClick={() => {
                handleSizeClick(size)
              }}
             >
               {size}
             </button>
              ))}
              </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <button className='btn btn-primary mt-3' onClick={handleAddCart}>
                Pridaj do kosika
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
