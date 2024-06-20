import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const roleMapping = {
  1: 'consumer',
  2: 'restaurant',
  3: 'livreur'
};

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { accessToken, role } = useContext(AuthContext);
  const userRole = roleMapping[role];

  if (!accessToken) {
    console.log('No access token, redirecting to login');
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log('Role not allowed, redirecting to login');
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
