import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/user/auth/me`, { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

