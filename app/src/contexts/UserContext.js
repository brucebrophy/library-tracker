import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import isAfter from 'date-fns/isAfter';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);

  const handleTokenRefresh = async (tokens) => {
    // check if refresh token is expired
    if(isAfter(tokens.refresh.expires, Date.now())) {
      handleLogout(); // logout
    }

    const response = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/refresh-tokens`, { 
      refreshToken: tokens.refresh.token 
    });

    setTokens(response.data);
    localStorage.setItem('tokens', JSON.stringify(response.data));
  };

  const handleLogin = async ({ email, password }) => {
    const response = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/login`, { email, password});
    const { user, tokens } = response.data;
    setUserData(user);
    setTokens(tokens);
    localStorage.setItem('tokens', JSON.stringify(tokens));
  };

  const handleLogout = async () => {
    console.log('log out');
  };

  useEffect(() => {
    let storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      handleTokenRefresh(JSON.parse(storedTokens));
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ userData, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
