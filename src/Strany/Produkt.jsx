import React, { useContext, useEffect } from 'react'
import { Kontext } from '../Kontext/Kontext'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Komponenty/ProductDisplay/ProductDisplay';
import InfoBar from '../Komponenty/InfoBar/InfoBar';
const Produkt = () => {
  
  const { all_product } = useContext(Kontext);
  const { productId } = useParams();

  const product = all_product.find((e)=> e.id === Number(productId));
  
  
  return (
    <div>
        <InfoBar/>
        <hr />
        <ProductDisplay product={product} />
    </div>
  )
}

export default Produkt