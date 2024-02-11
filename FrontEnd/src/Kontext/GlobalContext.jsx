import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [aktualnePohlavie, nastavAktualnePohlavie] = useState(null);

  const  nastavKategoriu = (category) => {
    nastavAktualnePohlavie(category);
  };

  return (
    <GlobalContext.Provider value={{ aktualnePohlavie, nastavAktualnePohlavie }}>
      {children}
    </GlobalContext.Provider>
  );
};