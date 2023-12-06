import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const loginUser = (userData) => {
    setLoggedInUser(userData);
  };

  const logoutUser = () => {
    setLoggedInUser(null);
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
