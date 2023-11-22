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

  
  return (
    <div className='slider'>
      <Slider {...settings}>
        {veci && veci.length > 0 && veci.map((vec, i) => {
          if (i < pocet) {
            return (
              <div key={i}>
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
     
    </div>
  );
};

export default SimpleSlider;