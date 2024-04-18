import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const Context = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const storeTokenInLokelStorage = (token) => {
    localStorage.setItem("token", token);
    setToken(localStorage.getItem("token"));
  };
  const isLoggedIn = !!token;
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/auth/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setUserData(userData.msg);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ userData, storeTokenInLokelStorage, token, isLoggedIn, setToken }}>{children}</UserContext.Provider>
  );
};

export default Context;
