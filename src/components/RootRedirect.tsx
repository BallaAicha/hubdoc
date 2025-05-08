import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to home if authenticated, otherwise to login
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};