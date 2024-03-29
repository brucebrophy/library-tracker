import { createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO'

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);

  const handleTokenRefresh = async (tokens) => {
    const userId = localStorage.getItem('userId');
    
    // check if refresh token is expired
    if (isAfter(Date.now(), parseISO(tokens.refresh.expires))) {
      return handleLogout(); // logout
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

  const handleRegister = async ({ name, email, password }) => {
    const response = await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/register`, { name, email, password});
    const { user, tokens } = response.data;
    setUserData(user);
    setTokens(tokens);
    localStorage.setItem('tokens', JSON.stringify(tokens));
    localStorage.setItem('userId', user.id);
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
    const storedTokens = JSON.parse(localStorage.getItem('tokens'));
    
    await Axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/logout`, { 
      refreshToken: storedTokens.refresh.token 
    });

    setTokens(undefined);
    setUserData(undefined);

    localStorage.removeItem('tokens');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem('tokens');
    if (storedTokens) {
      handleTokenRefresh(JSON.parse(storedTokens));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <UserContext.Provider value={{ tokens, userData, handleRegister, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
