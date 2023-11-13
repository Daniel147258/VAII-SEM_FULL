import React from 'react';
import './Kolekcia.css';
import noveKolekcie from '../Assets/new_collections';
import SimpleSlider from '../SimpleSlider/SimpleSlider'; 

const Kolekcia = () => {
  return (
    <div className='container kolekcia-container'>
      <h1 className='text-center'>Produkty</h1>
      <hr />
      <SimpleSlider veci={noveKolekcie} />
    </div>
  );
};

export default Kolekcia;