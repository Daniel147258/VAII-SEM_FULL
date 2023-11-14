import React, { useContext } from 'react'
import './Nakupovanie.css'
import { Kontext } from '../../Kontext/Kontext'
import Vec from '../Vec/Vec'

const Nakupovanie = (props) => {
    const {all_product} = useContext(Kontext)
  return (
    <div>
        <p>
            <span>Prehladanie 1-12 </span>
            z 36 moznych produktov
        </p>
        <div>
            Triedene podla 
        </div>

        <div>
            {all_product.map((vec,i)=>{
                if (props.category===vec.category){
                    return <Vec key={i} id={vec.id}
                    name={vec.name}
                    image={vec.image}
                    new_price={vec.new_price}
                    old_price={vec.old_price}/>
                }
                else{
                    return null;
                }
            })}

            
        </div>
    </div>
  )
}

export default Nakupovanie