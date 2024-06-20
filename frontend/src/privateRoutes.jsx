import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './authContext';

const roleMapping = {
  1: 'consumer',
  2: 'restaurant',
  3: 'livreur'
};

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { accessToken, role, isTokenExpired, refreshAccessToken, isLoading } = useContext(AuthContext);
  const userRole = roleMapping[role];
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (isTokenExpired(accessToken)) {
        console.log('Token expired, attempting to refresh...');
        await refreshAccessToken();
      } else {
        console.log('Token is valid.');
      }
      setIsTokenChecked(true);
    };
    checkToken();
  }, [accessToken, isTokenExpired, refreshAccessToken]);

  if (isLoading || !isTokenChecked) {
    console.log('Loading or checking token...');
    return <div>Loading...</div>; // Show a loading indicator while checking and refreshing the token
  }

  if (!accessToken) {
    console.log('No access token, redirecting to login');
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log('Role not allowed, redirecting to login');
    return <Navigate to="/" />;
  }

  console.log('Access token and role valid, rendering component.');
  return <Component />;
};

export default ProtectedRoute;
