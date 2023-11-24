import React from 'react';
import Slider from 'react-slick';
import Vec from '../Vec/Vec';
import './SimpleSlider.css'


const SimpleSlider = ({ veci, pocet }) => {
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  const sliderRef = React.createRef();

  return (
    <div className='slider-container'>
      <button onClick={handlePrevClick} className='slider-button prev'>
      </button>
      <Slider ref={sliderRef} {...settings}>
        {veci &&
          veci.length > 0 &&
          veci.map((vec, i) => {
            if (i < pocet) {
              return (
                <div key={i} className='item'>
                  {/* Komponent Vec s obsahom */}
                  <Vec
                    id={vec.id}
                    name={vec.name}
                    category={vec.category}
                    image={vec.image}
                    new_price={vec.new_price}
                    old_price={vec.old_price}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
      </Slider>
      <button onClick={handleNextClick} className='slider-button next'>
      </button>
    </div>
  );
};


export default SimpleSlider;