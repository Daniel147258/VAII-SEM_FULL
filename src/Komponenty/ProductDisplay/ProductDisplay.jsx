import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useBreadcrumb } from '../../Kontext/BreadcrumbContext';
import SizeDropdown from '../SizeDropdown/Sizedropdown';
import RecenziaBox from '../RecenziaBox/RecenziaBox';
import Footer from '../Footer/Footer';
import RelevantProducts from '../RelevantProducts/RelevantProducts';

const ProductDisplay = (props) => {
  const { product } = props;
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blinking, setBlinking] = useState(false);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const { clearBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    return () => {
      clearBreadcrumbs();
    };
  }, []);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleClick = () =>{
    setBlinking(true);
    setTimeout(() => {
      setBlinking(false);
    }, 150); // To je v miliSekundach
  }

  const handleSizeClick = (size) => {
    if(selectedSize == size){
      setSelectedSize(null);
    }
    else{
      setSelectedSize(size);
      controlSelectedSize(size);
    }
    
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
    <div>
    <div className='container' id='block'>
      <div className='row'>
        <div className='col-md-6 col-8'>
          <div className='productdisplay-img'>
            <img className='productdisplay-main-img img-fluid' src={product.image} alt="" />
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
        <div className='col-md-6 col-8'>
          <div className='productdisplay-right'>
            <Breadcrumb product={props}/>
            <h1>{product.name}</h1>
            
            <div className='col-md-12'>
              <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vel voluptatibus assumenda sequi doloribus 
              incidunt magnam doloremque delectus enim quam voluptas excepturi impedit voluptate, deserunt non pariatur saepe id minus.</p>
            </div>
            <div className='col-md-8'>
            <h1 style={{fontSize: '24px'}}>Zvoľ velkosť:</h1>
              <div className='productdisplay-right-sizes'>
              <SizeDropdown sizes={sizes} selectedSize={selectedSize} handleSizeClick={handleSizeClick} /> 
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
              <div className='row'>
              <div className='container-fluid' id='cena'>
              <span style={{fontSize: '21px', color: 'black'}}>Aktuálna cena: {product.new_price}€</span>
              <span style={{fontSize: '21px', color: 'grey', marginLeft: '25px', textDecoration: 'line-through'}}>{product.old_price}€</span>
              </div>
            </div>
              </div>
                <button type="button" className={`btn btn-primary btn-square mt-3 col-lg-5 ${blinking ? 'blink' : ''}`} id='addToCart'
                onClick={() => {
                  handleAddCart();
                  handleClick();
                }}>
                  Pridať do košíka
                </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
    <RecenziaBox/>
    
    <RelevantProducts produkt={product} pocet={5} />
    <Footer/>
    </div>
  );
};

export default ProductDisplay;
