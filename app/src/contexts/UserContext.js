import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import isAfter from 'date-fns/isAfter';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);

  const handleTokenRefresh = async (tokens) => {
    const userId = localStorage.getItem('userId');
    
    // check if refresh token is expired
    if (isAfter(tokens.refresh.expires, Date.now())) {
      handleLogout(); // logout
    }

    const tokenResponse = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/refresh-tokens`, { 
      refreshToken: tokens.refresh.token 
    });

    setTokens(tokenResponse.data);
    localStorage.setItem('tokens', JSON.stringify(tokenResponse.data));

    if (!userData && userId) {
      const userResponse = await Axios.get(`${process.env.REACT_APP_API_URL}/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`
        }
      });

      setUserData(userResponse.data);
    }
  };

  const handleLogin = async ({ email, password }) => {
    const response = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/login`, { email, password});
    const { user, tokens } = response.data;
    setUserData(user);
    setTokens(tokens);
    localStorage.setItem('tokens', JSON.stringify(tokens));
    localStorage.setItem('userId', user.id);
  };

  const handleLogout = async () => {
    await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/logout`, { 
      refreshToken: tokens.refresh.token 
    });

    setTokens(undefined);
    setUserData(undefined);

    localStorage.removeItem('tokens');
    localStorage.removeItem('userId');
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
