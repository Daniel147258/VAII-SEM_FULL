import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";


const ProductDisplay = (props) => {
  const { product } = props;

  if (!product) {
    return <p>Produkt nie je k dispozícii.</p>;
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='productdisplay-img'>
            <img className='productdisplay-main-img img-fluid' src={product.image} alt="" />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-3'>
              <img src={product.image} alt="" className='img-fluid' />
            </div>
            <div className='col-md-3'>
              <img src={product.image} alt="" className='img-fluid' />
            </div>
            <div className='col-md-3'>
              <img src={product.image} alt="" className='img-fluid' />
            </div>
            <div className='col-md-3'>
              <img src={product.image} alt="" className='img-fluid' />
            </div>
          </div>
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
              <div className='productdisplay-right-price-old'>${product.old_price}</div>
              <div className='productdisplay-right-price-new'>${product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
              A lightweight, usually knitted, pullover shirt, close-fitting and with
              a round neckline and short sleeves, worn as an undershirt or outer
              garment.
            </div>
            <div className='productdisplay-right-size'>
              <h1>Zvol Velkost</h1>
              <div className='productdisplay-right-sizes'>
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
              </div>
              <button className='btn btn-primary mt-3'>Pridaj do kosika</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
