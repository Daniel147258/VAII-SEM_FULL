import React, { createContext, useContext, useEffect, useState } from 'react';

const ScrollToTopContext = createContext();

export const useScrollToTop = () => {
  return useContext(ScrollToTopContext);
};

export const useInteractive = () => {
  return useContext(InteractiveContext);
};

const InteractiveContext = createContext();

export const ScrollToTopProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo(0, 200);
  };

  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    const handleLocationChange = () => {
      setInteractive(false);
      scrollToTop();
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <ScrollToTopContext.Provider value={scrollToTop}>
      <InteractiveContext.Provider value={interactive}>
        {children}
      </InteractiveContext.Provider>
    </ScrollToTopContext.Provider>
  );
};
