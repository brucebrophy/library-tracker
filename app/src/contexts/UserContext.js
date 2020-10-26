import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);

  const handleTokenRefresh = async () => {
    // refresh access token
    console.log('getting tokens');
    // then put new tokens into local stoage
  };

  const logout = () => {
    // make request to api to logut

    // clear tokens in local stoage 
  };

  useEffect(() => {
    // check if there are tokens in localstoage 
    let storedTokens = localStorage.getItem('tokens');

    if (storedTokens) {
      handleTokenRefresh(storedTokens);
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ userData, logout }}>
      {children}
    </UserContext.Provider>
  );
};
