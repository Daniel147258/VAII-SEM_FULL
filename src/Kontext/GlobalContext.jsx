import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [aktualnaKategoria, nastavAktualnuKategoriu] = useState(null);

  const  nastavKategoriu = (category) => {
    nastavAktualnuKategoriu(category);
  };

  return (
    <GlobalContext.Provider value={{ aktualnaKategoria, nastavKategoriu }}>
      {children}
    </GlobalContext.Provider>
  );
};