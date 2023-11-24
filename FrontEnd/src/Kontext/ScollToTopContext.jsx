import React, { createContext, useContext, useEffect } from 'react';

const ScrollToTopContext = createContext();

export const useScrollToTop = () => {
  return useContext(ScrollToTopContext);
};

export const ScrollToTopProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      scrollToTop();
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <ScrollToTopContext.Provider value={scrollToTop}>
      {children}
    </ScrollToTopContext.Provider>
  );
};
