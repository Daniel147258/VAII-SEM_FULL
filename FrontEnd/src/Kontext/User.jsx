import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('loginUser');
    if (storedUser) {
      loginUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setLoggedInUser(userData);
    localStorage.setItem('loginUser', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loginUser');
  };

  return (
    <UserContext.Provider value={{ loggedInUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
