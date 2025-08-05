// src/pages/OAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/Constants/userContext";
import { toast } from "sonner";

const OAuthCallback = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const {setUser} = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/verify-token`, {
          withCredentials: true,
        });
        console.log("OAUTH_CALLBACK",res.data.data);
        setUser(res.data);
        localStorage.setItem("loggedIn", "true");
        toast.success("User logged in successfully");
        navigate("/");
      } catch (err) {
        console.log("OAuth login failed", err);
        navigate("/Login");
      }
    };

    getUser();
  }, []);

  return <div>Logging in via GitHub...</div>;
};

export default OAuthCallback;
