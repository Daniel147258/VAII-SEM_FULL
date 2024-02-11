import React, { useState, useEffect } from 'react';
import './ProductDisplay.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useBreadcrumb } from '../../Kontext/BreadcrumbContext';
import SizeDropdown from '../SizeDropdown/Sizedropdown';
import Footer from '../Footer/Footer';
import RelevantProducts from '../RelevantProducts/RelevantProducts';
import { useScrollToTop, useInteractive } from '../../Kontext/ScollToTopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import all_product from '../Assets/all_product';

const ProductDisplay = (props) => {
  const [pr, setPr] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blinking, setBlinking] = useState(false);
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const { clearBreadcrumbs } = useBreadcrumb();
  const scrollToTop = useScrollToTop();
  const {  productId } = useParams();
  const interactive = useInteractive();

  useEffect(() => {
    axios.get('http://localhost:3008/api/getProdukt' , {
        params: {
          pisd: productId
        }
    })
    .then(response => {
        setPr(response.data);
    })
    .catch(error => {
        console.error('Error fetching categries:', error);
        
    });

}, [productId]);


  useEffect(() => {
    window.scrollTo(0,200);
  }, [productId, scrollToTop]);

  useEffect(() => {
    
    scrollToTop();
  }, [scrollToTop]);

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
    if(selectedSize === size){
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
    {!pr || pr.length === 0 ? (
      <div>
      {all_product.map((product, i) => {
        const parsedProductId = parseInt(productId);
        const parsedProductIdFromProduct = parseInt(product.id);
        if (!isNaN(parsedProductId) && !isNaN(parsedProductIdFromProduct) && parsedProductId === parsedProductIdFromProduct) {
          return (
            <div key={i} className='container' id='block'>
              
              <div className='row'>
                <div className='col-md-6 col-8'>
                  <div className='productdisplay-img'>
                    <img className='productdisplay-main-img img-fluid' src={product.image} alt="" />
                  </div>
                  <div className='row'>
                    {(Array.isArray(product.image) ? product.image : [product.image]).map((thumbnail, index) => (
                      <div key={index} className='col-md-3'>
                        <img
                          src={thumbnail}
                          alt=""
                          className={`img-fluid ${selectedImage === thumbnail ? 'selected' : ''}`}
                          onClick={() => handleThumbnailClick(thumbnail)}
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
                        incidunt magnam doloremque delectus enim quam voluptas excepturi impedit voluptate, deserunt non pariatur saepe id minus.
                      </p>
                    </div>
                    <div className='col-md-8'>
                      <h1 style={{fontSize: '24px'}}>Zvoľte veľkosť:</h1>
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
                      <button 
                        type="button" 
                        className={`btn btn-primary btn-square mt-3 col-lg-5 ${blinking ? 'blink' : ''}`} 
                        id='addToCart'
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
              {interactive && (
                <div>
                  <RelevantProducts produkt={product} pocet={5} />
                  <Footer/>
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
    ) : (
      <div>
        <p>{pr.nazov}</p>
        {pr.map((najdeny, i) => {
          return (
            <div key={i}>
              <div className='container' id='block'>
          <div className='row'>
            <div className='col-md-6 col-8'>
              <div className='productdisplay-img'>
                <img style={{maxHeight: '65vh', maxWidth: '65vh'}}className='productdisplay-main-img img-fluid' 
                src={URL.createObjectURL(new Blob([new Uint8Array(najdeny.obrazok.data)], 
                                { type: 'image/jpeg' }))} alt="" />
              </div>
              <div className='row'>
                {(Array.isArray(najdeny.obrazok) ? najdeny.obrazok : [najdeny.obrazok]).map((thumbnail, index) => (
                  <div className='col-md-3'>
                    <img
                      src={URL.createObjectURL(new Blob([new Uint8Array(najdeny.obrazok.data)], 
                        { type: 'image/jpeg' }))}
                      alt=""
                      className={`img-fluid ${selectedImage === najdeny.obrazok ? 'selected' : ''}`}
                      onClick={() => handleThumbnailClick(najdeny.obrazok)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='col-md-6 col-8'>
              <div className='productdisplay-right'>
                <Breadcrumb produkt={najdeny.data}/>
                <h1>{najdeny.nazov}</h1>
                <div className='col-md-12'>
                  <p className='description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati vel voluptatibus assumenda sequi doloribus 
                    incidunt magnam doloremque delectus enim quam voluptas excepturi impedit voluptate, deserunt non pariatur saepe id minus.
                  </p>
                </div>
                <div className='col-md-8'>
                  <h1 style={{fontSize: '24px'}}>Zvoľ velkosť:</h1>
                  <div className='productdisplay-right-sizes'>
                    <SizeDropdown sizes={sizes} selectedSize={selectedSize} handleSizeClick={handleSizeClick} /> 
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
                    <div className='row'>
                      <div className='container-fluid' id='cena'>
                        <span style={{fontSize: '21px', color: 'black'}}>Aktuálna cena: {najdeny.cena}€</span>
                        <span style={{fontSize: '21px', color: 'grey', marginLeft: '25px', textDecoration: 'line-through'}}>{najdeny.cena}€</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className={`btn btn-primary btn-square mt-3 col-lg-5 ${blinking ? 'blink' : ''}`} 
                    id='addToCart'
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
          {interactive && (
            <div>
              <RelevantProducts produkt={najdeny} pocet={5} />
              <Footer/>
            </div>
          )}
        </div>
          );
        })}
      </div>
    )}
    </div>
  );
};

export default ProductDisplay;
