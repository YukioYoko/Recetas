import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      setIsAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!isAuthChecked) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
