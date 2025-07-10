import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);       
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";
        if (!isLoggedIn) {
          setUser(null);
          return setLoading(false);
        }

        const res = await axios.get("http://localhost:4000/verify-token", {
          withCredentials: true,
        });

        setUser(res.data); 
        setLoading(false);
      } catch (error) {
        console.error("Failed to verify token", error);
        localStorage.setItem("loggedIn", "false");
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
