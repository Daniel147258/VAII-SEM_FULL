import React, { createContext } from 'react'
import all_product from '../Komponenty/Assets/all_product'

export const Kontext = createContext(null);

const ContextProvider = (props) =>{

    const kontextHodnota = {all_product} // vsetk produkty ;

    return (
        <Kontext.Provider value={kontextHodnota}>
            {props.children}
        </Kontext.Provider>
    )
}

export default ContextProvider;