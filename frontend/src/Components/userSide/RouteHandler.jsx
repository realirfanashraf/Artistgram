import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminJWTToken } from '../../helper/checkJwtToken';



export const AuthRoute = ({ component: Component ,isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" replace /> : <Component />;
};

export const PrivateRoute = ({ component: Component,isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
};











export const AdminAuthRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("admin auth")
    const isAuthenticated = checkAdminJWTToken();
    setIsAuthenticated(isAuthenticated);
  }, []);

  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Component />;
};

export const AdminPrivateRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('ygugyugugu');
    const isAuthenticated = checkAdminJWTToken();
    setIsAuthenticated(isAuthenticated);
  }, []);

  return isAuthenticated ? <Component /> : <Navigate to="/admin" replace />;
};
