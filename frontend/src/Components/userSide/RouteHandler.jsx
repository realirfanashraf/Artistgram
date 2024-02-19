import {  Navigate } from 'react-router-dom';
import { checkJWTToken, checkAdminJWTToken } from '../../helper/checkJwtToken'

export const AuthRoute = ({ component: Component}) => {
  const isAuthenticated = checkJWTToken();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Component/>;
}

export const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = checkJWTToken();
    return isAuthenticated ? <Component/> : <Navigate to="/signin" replace />;
  };
  
export const AdminAuthRoute = ({ component: Component}) => {
  const isAuthenticated = checkAdminJWTToken();
  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Component/>;
}

export const AdminPrivateRoute = ({ component: Component }) => {
  const isAuthenticated = checkAdminJWTToken();
  return isAuthenticated ? <Component/> : <Navigate to="/admin" replace />;
}

