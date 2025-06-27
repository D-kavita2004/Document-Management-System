import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null); // null = loading, true = valid, false = invalid

  useEffect(() => {
    const checkToken = async () => {
      const isAuthenticated = localStorage.getItem("loggedIn") === "true";
      if (!isAuthenticated) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/verify-token", {
          withCredentials: true,
        });
        console.log("Token valid", res.data.data);
        setIsValid(true);
      } catch (error) {
        console.error("Token verification failed", error);
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>; // or a spinner
  }

  return isValid ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
