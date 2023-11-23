import React,{ useContext } from 'react'
import SimpleSlider from '../SimpleSlider/SimpleSlider';
import { Kontext } from '../../Kontext/Kontext';
import Vec from '../Vec/Vec';
const RelevantProducts = ({ produkt, pocet }) => {
    const { all_product } = useContext(Kontext);
    const filteredProducts = all_product
    .filter((vec) => produkt.category === vec.category && produkt.id !== vec.id)
    .map((vec) => ({
      id: vec.id,
      category: vec.category,
      name: vec.name,
      image: vec.image,
      new_price: vec.new_price,
      old_price: vec.old_price,
    }));
    return (
        <div className='container kolekcia-container'>
          <h1 className='text-center'>Podobné Produkty</h1>
          <hr />
          <SimpleSlider veci={filteredProducts} pocet={pocet} />
        </div>
      );
};

export default RelevantProducts