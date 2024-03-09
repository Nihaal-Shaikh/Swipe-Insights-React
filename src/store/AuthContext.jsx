import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [tokenableId, setTokenableId] = useState(null);

  const login = (tokenableId) => {
    setTokenableId(tokenableId);
  };

  const logout = () => {
    setUserToken(null);
    setTokenableId(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, tokenableId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
