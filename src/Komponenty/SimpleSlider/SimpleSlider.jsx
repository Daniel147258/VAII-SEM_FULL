import React from 'react';
import Slider from 'react-slick';
import Vec from '../Vec/Vec';
import './SimpleSlider.css'


const SimpleSlider = ({ veci }) => {
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
    <div>
      <Slider {...settings}>
        {veci.map((vec, i) => (
          <div key={i}>
            <Vec
              id={vec.id}
              name={vec.name}
              image={vec.image}
              new_price={vec.new_price}
              old_price={vec.old_price}
          />
          </div>
        ))}
      </Slider>
      <hr />
    </div>
  );
};

export default SimpleSlider;