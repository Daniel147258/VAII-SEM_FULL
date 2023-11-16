import React, { createContext } from 'react'
import all_product from '../Komponenty/Assets/all_product'

export const Kontext = createContext(null);


const KontextProvider = (props) => {

    const kontextHodnota = {all_product}; // vsetky produkty ;

    return (
        <Kontext.Provider value={kontextHodnota}>
            {props.children}
        </Kontext.Provider>
    )
}

export default KontextProvider;